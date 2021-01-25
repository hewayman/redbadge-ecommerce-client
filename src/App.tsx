import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Admin from './components/Users/Admin';
import FilterItems from './components/StoreItems/FilterItems';
import Footer from './components/Site/Footer';
import ItemDetailView from './components/StoreItems/ItemDetailView';
import Login from './components/Auth/Login';
import Navbar from './components/Site/Navbar';
import Register from './components/Auth/Register';
import StoreItemsCreate from './components/StoreItems/StoreItemCreate';
import StoreItemsList from './components/StoreItems/StoreItemsList';
import UserList from './components/Users/UserList';
import Cart from './components/Site/Cart';
 
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
  isAdmin: boolean;
  firstName: string;
  searchTerm: string;
  searchItems: any[];
  rating: number;
  redirect: boolean;
  errorStatus: boolean;
  cart: any[];
  itemObj: any;
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
      errorStatus: false,
      cart: [],
      itemObj: ''
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
      localStorage.setItem('token', token)
    } else {
      this.setState({token: localStorage.getItem('token') || ''}) 
    }
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

  updateItem = (item: any) => {
    this.setState({ itemObj: item })
    console.log('itemid', item)
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
      if (state.sort !== '') {
        this.state.storeItems.sort((a,b) => (state.sort === 'lowest') ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1))
      } else {
        state.storeItems.sort((a,b) => (a.id > b.id ? 1: -1)); // set default sort by id
      }
      
      return {filteredItems: this.state.storeItems};
    })
  }

  handleChangeSort = (e: any) => {
    this.setState({sort: e.target.value})
    this.listItems();
  }

  removeFromCart = (product: any) => {
    try {
      this.setState({cart: this.state.cart.slice()});
      this.setState({ cart: this.state.cart.filter(item => item.id !== product)})
      // this.setState({ redirect: true })
      console.log('Item removed from cart.')
      console.log('cart: ', this.state.cart)
    } catch {
      console.log('Item not removed from cart.')
    }
  }

  addToCart = (product: any) => {
    try {
      this.setState({cart: this.state.cart.slice()});
      let alreadyInCart = false;
      this.state.cart.forEach((item: any) => {
        if (item.id === product.id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        this.state.cart.push({...product, count: 1});
      }
      this.setState({ cart: this.state.cart})
        console.log('add to cart: ', product)
        console.log('cart: ', this.state.cart)
    } catch {
      console.log('did not add to cart')
    }
  }

  componentDidMount() {
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
          {/* redirect to '/' when user logs out */}
          {this.state.redirect ? (<Redirect to='/'/> && window.location.reload()) : null}
          {/* if there is an issue fetching data, redirect to home page */}
          {this.state.errorStatus ? (<Redirect to="/" />) : null}
          <Switch>
            <Route path='/' exact ><StoreItemsList sessionToken={this.state.token} adminStatus={this.state.isAdmin} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems} sort={this.state.sort} handleChangeSort={this.handleChangeSort} updateItemId={this.updateItemId} updateItem={this.updateItem} addToCart={this.addToCart} storeItemObj={this.state.itemObj}/></Route>
            <Route path='/user/register'><Register updateToken={this.updateToken} token={this.state.token}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken} token={this.state.token} adminStatus={this.state.isAdmin}/></Route>
            <Route path='/user/admin'><Admin sessionToken={this.state.token}/></Route>
            <Route path='/user/all' ><UserList users={this.state.users} fetchUsers={this.fetchUsers} sessionToken={this.state.token} token={this.state.token}/></Route>
            <Route path='/listing/create'><StoreItemsCreate sessionToken={this.state.token} fetchStoreItems={this.fetchStoreItems}/></Route>
            <Route path='/listing/:id'><ItemDetailView storeItemId={this.state.itemId} sessionToken={this.state.token} userId={this.state.userId} adminStatus={this.state.isAdmin} addToCart={this.addToCart} storeItemObj={this.state.itemObj}/></Route>
            <Route path='sort'><FilterItems sort={this.state.sort} handleChangeSort={this.handleChangeSort} /></Route>
            <Route path='/cart'><Cart cartItems={this.state.cart} removeFromCart={this.removeFromCart}/></Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
