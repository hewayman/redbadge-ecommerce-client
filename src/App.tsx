import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Users/Admin';
import FilterItems from './components/StoreItems/FilterItems';
import ItemDetailView from './components/StoreItems/ItemDetailView';
import Login from './components/Auth/Login';
import Navbar from './components/Site/Navbar';
import Register from './components/Auth/Register';
import StoreItemsCreate from './components/StoreItems/StoreItemCreate';
import StoreItemsList from './components/StoreItems/StoreItemsList';
// import StoreItemsSearch from './components/StoreItems/StoreItemsSearch';
import UserList from './components/Users/UserList';
 
type AppState = {
  token: string;
  newToken: string;
  id: number;
  setStoreItems: any;
  storeItems: any[];
  // searchTerm: string;
  users: any[];
  filteredItems: any[];
  sort: any;
  isAdmin: any;
  firstName: string;
}

class App extends React.Component <{}, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      token: '',
      newToken: '',
      id: -1,
      setStoreItems: '',
      storeItems: [],
      // searchTerm: '',
      users: [],
      filteredItems: [],
      sort: '',
      isAdmin: false,
      firstName: ''
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
  }

  fetchUsers = () => {
    fetch('http://localhost:8080/user/all/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ users: obj.user }))
  }

  setToken = (token: string, id: any, isAdmin: boolean) => {
    if (token) {
      this.setState({token: token})
      this.setState({id: id})
      this.setState({isAdmin: isAdmin})
    } else {
      this.setState({token: localStorage.getItem('token') || ''}) 
      this.setState({id: parseInt(localStorage.getItem('id')!)})
    }
    localStorage.setItem('token', token)
    localStorage.setItem('id', id)
  }

  // updates the state for the token, userId, and admin status when a user logins or registers
  updateToken = (newToken: any, updateId: any, updateAdmin: boolean, updateFirstName: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('id', updateId)
    this.setState({token: newToken});
    this.setState({id: updateId});
    this.setState({isAdmin: updateAdmin})
    this.setState({firstName: updateFirstName})
    console.log('Token: ', newToken)
    console.log("User id: ", updateId)
    console.log("Admin? :", updateAdmin)
    console.log("User first name:", updateFirstName)
  }

  clearToken = () => {
    localStorage.clear();
    window.location.reload();
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
    this.setToken('', -1, false)
    // this.setUserId(-2)
    this.fetchStoreItems()
    this.fetchUsers()
  }

  render() {
   
    return (
      <div> 
        {/* {console.log("App token " + this.state.token)} */}
        <Router>
          <Navbar clickLogout={this.clearToken} sessionToken={this.state.token} adminStatus={this.state.isAdmin} userFirstName={this.state.firstName}/>
          <FilterItems sort={this.state.sort} handleChangeSort={this.handleChangeSort} />
          <Switch>
            <Route path='/listing/create'><StoreItemsCreate sessionToken={this.state.token} fetchStoreItems={this.fetchStoreItems}/></Route>
            <Route path='/user/register'><Register updateToken={this.updateToken} token={this.state.token}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken} token={this.state.token} adminStatus={this.state.isAdmin}/></Route>
            <Route path='/user/all' ><UserList users={this.state.users} fetchUsers={this.fetchUsers} sessionToken={this.state.token} token={this.state.token}/></Route>
            {/* <Route path='/user/details' ><UserEdit users={this.state.users} fetchUsers={this.fetchUsers} sessionToken={this.state.token}/></Route> */}
            <Route path='/' exact ><StoreItemsList sessionToken={this.state.token} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems} sort={this.state.sort} handleChangeSort={this.handleChangeSort}/></Route>
            <Route path='/listing/:id'><ItemDetailView storeItem={''}/></Route>
            <Route path='/user/admin'><Admin sessionToken={this.state.token} /></Route>
          </Switch>
        </Router>
        {/* {this.searchTerm ? <StoreItemsSearch /> : <StoreItemsList sessionToken={this.state.token} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems}/>} */}
      </div>
    );
  }
}

export default App;
