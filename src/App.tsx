import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Admin from './components/Users/Admin';
import FilterItems from './components/StoreItems/FilterItems';
import ItemDetailView from './components/StoreItems/ItemDetailView';
import Login from './components/Auth/Login';
import Navbar from './components/Site/Navbar';
import Register from './components/Auth/Register';
import StoreItemsCreate from './components/StoreItems/StoreItemCreate';
import StoreItemsList from './components/StoreItems/StoreItemsList';
import UserList from './components/Users/UserList';
 
type AppState = {
  token: string;
  newToken: string;
  userId: number;
  setStoreItems: any;
  storeItems: any[];
  itemId: number;
  users: any[];
  filteredItems: any[];
  sort: any;
  isAdmin: any;
  firstName: string;
  searchTerm: string;
  searchItems: any[];
  rating: number;
  redirect: boolean;
  errorStatus: boolean;
}

class App extends React.Component <{}, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      token: '',
      newToken: '',
      userId: -1,
      setStoreItems: '',
      storeItems: [],
      itemId: 0,
      users: [],
      filteredItems: [],
      sort: '',
      isAdmin: false,
      firstName: '',
      searchTerm: '',
      searchItems: [],
      rating: 0,
      redirect: false,
      errorStatus: false
    }
  }

  fetchStoreItems = () => {
    fetch('http://localhost:8080/listing/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ 
        storeItems: obj.listing, 
        filteredItems: obj.listing })) // filters items based on price
      .catch(err => {console.log(err); {this.setState({errorStatus: true})}})
  }

  fetchUsers = () => {
    fetch('http://localhost:8080/user/all/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ users: obj.user }))
      .catch(err => {console.log(err); {this.setState({errorStatus: true})}})
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({token: token})
    } else {
      this.setState({token: localStorage.getItem('token') || ''}) 
    }
    localStorage.setItem('token', token)
  }

  // updates the state for the token, userId,admin status, and first name when a user logs in or registers
  updateToken = (newToken: any, updateId: any, updateAdmin: boolean, updateFirstName: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('id', updateId)
    this.setState({token: newToken});
    this.setState({userId: updateId});
    this.setState({isAdmin: updateAdmin})
    this.setState({firstName: updateFirstName})
    console.log('Token: ', newToken)
    console.log("User id: ", updateId)
    console.log("Admin? :", updateAdmin)
    console.log("User first name:", updateFirstName)
  }

  updateSearch = (storeItem: any[]) => {
    this.setState({ storeItems: storeItem })
    console.log("search", storeItem)
  }

  updateItemId = (itemId: any) => {
    this.setState({ itemId: itemId })
    console.log('itemid', itemId)
  }

  // when user logs out, it redirects to '/' and resets the first name
  clearToken = () => {
    localStorage.clear();
    this.setState({ redirect: true })
    this.setState({ firstName: ''})
  }

  listItems = () => {
    this.setState(state => {
      // if state of sort is not empty, sort based on lowest or highest price
      if(state.sort !== '') {
        this.state.storeItems.sort((a,b) => (this.state.sort === 'lowest') ? (a.price < b.price ? 1 : -1) : (a.price > b.price ? 1 : -1))
      } 
      else {
        state.storeItems.sort((a,b) => (a.id > b.id ? 1: -1));
      }
      return {filteredItems: this.state.storeItems};
    })
  }

  handleChangeSort = (e: any) => {
    this.setState({sort: e.target.value})
    this.listItems();
  }

  componentWillMount() {
    this.setToken('')
    this.fetchStoreItems()
    this.fetchUsers()
  }

  render() {  
    
    return (
      <div> 
        {/* {console.log("App token " + this.state.rating)} */}
        <Router>
          <Navbar clickLogout={this.clearToken} sessionToken={this.state.token} adminStatus={this.state.isAdmin} userFirstName={this.state.firstName} searchItems={this.state.searchItems} updateSearch={this.updateSearch} fetchStoreItems={this.fetchStoreItems} />
          // redirect to '/' when user logs out
          {this.state.redirect ? (<Redirect to='/'/>) : null}
          // if there is an issue fetching data, redirect to home page
          {this.state.errorStatus ? (<Redirect to="/" />) : null}
          <Switch>
            <Route path='/listing/create'><StoreItemsCreate sessionToken={this.state.token} fetchStoreItems={this.fetchStoreItems}/></Route>
            <Route path='/user/register'><Register updateToken={this.updateToken} token={this.state.token}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken} token={this.state.token} adminStatus={this.state.isAdmin}/></Route>
            <Route path='/user/all' ><UserList users={this.state.users} fetchUsers={this.fetchUsers} sessionToken={this.state.token} token={this.state.token}/></Route>
            <Route path='/' exact ><StoreItemsList sessionToken={this.state.token} adminStatus={this.state.isAdmin} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems} sort={this.state.sort} handleChangeSort={this.handleChangeSort} updateItemId={this.updateItemId} /></Route>
            <Route path='/listing/:id'><ItemDetailView storeItemId={this.state.itemId} sessionToken={this.state.token} /></Route>
            <Route path='/user/admin'><Admin sessionToken={this.state.token}/></Route>
            <Route path='sort'><FilterItems sort={this.state.sort} handleChangeSort={this.handleChangeSort} /></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
