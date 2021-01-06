import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/Users/Admin'
import Navbar from './components/Site/Navbar'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import StoreItemsCreate from './components/StoreItems/StoreItemCreate'
import StoreItemsList from './components/StoreItems/StoreItemsList';
import StoreItemsSearch from './components/StoreItems/StoreItemsSearch';
import UserList from './components/Users/UserList';
import ItemDetailView from './components/StoreItems/ItemDetailView';
 
type AppState = {
  token: string;
  newToken: string;
  setStoreItems: any;
  storeItems: any[];
  // searchTerm: string;
  users: any[];
}

class App extends React.Component <{}, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      token: '',
      newToken: '',
      setStoreItems: '',
      storeItems: [],
      // searchTerm: '',
      users: []
    }
  }

  fetchStoreItems = () => {
    fetch('http://localhost:8080/listing/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ storeItems: obj.listing }))
  }

  fetchUsers = () => {
    fetch('http://localhost:8080/user/all/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ users: obj.user }))
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({token: token})
    } else {
      this.setState({token: localStorage.getItem('token') || ''}) 
    }
    localStorage.setItem('token', token)
  }

  updateToken = (newToken: any) => {
    localStorage.setItem('token', newToken);
    this.setState({token: newToken});
    console.log(newToken)
  }

  clearToken = () => {
    localStorage.clear();
    this.setToken('');
  }

  componentWillMount() {
    this.setToken('')
    this.fetchStoreItems()
    this.fetchUsers()
  }

  render() {
   
    return (
      <div> 
        {console.log("App token " + this.state.token)}
        <Router>
          <Navbar clickLogout={this.clearToken} sessionToken={this.state.token}/>
          <Switch>
            <Route path='/listing/create'><StoreItemsCreate sessionToken={this.state.token} fetchStoreItems={this.fetchStoreItems}/></Route>
            <Route path='/user/register'><Register updateToken={this.updateToken}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken}/></Route>
            <Route path='/user/all' ><UserList users={this.state.users} fetchUsers={this.fetchUsers} sessionToken={this.state.token}/></Route>
            <Route path='/' exact ><StoreItemsList sessionToken={this.state.token} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems}/></Route>
            <Route path='/listing' ><ItemDetailView itemName={''}/></Route>
            <Route path='/user/admin'><Admin sessionToken={this.state.token} /></Route>
          </Switch>
        </Router>
        {/* {this.searchTerm ? <StoreItemsSearch /> : <StoreItemsList sessionToken={this.state.token} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems}/>} */}
      </div>
    );
  }
}

export default App;
