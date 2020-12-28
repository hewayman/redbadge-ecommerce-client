import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Site/Navbar'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import StoreItems from './components/StoreItems/StoreItems'
import StoreItemsList from './components/StoreItems/StoreItemsList';
 
type AppState = {
  token: string;
  newToken: string;
  setStoreItems: any;
  storeItems: any[]
}

class App extends React.Component <{}, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      // sessionToken: this.props.sessionToken
      token: '',
      newToken: '',
      setStoreItems: '',
      storeItems: []
    }
  }

  fetchStoreItems = () => {
    fetch('http://localhost:8080/listing/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({storeItems: obj.listing}))
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
  }

  render() {
   
    return (
      <div> 
        {console.log("App token " + this.state.token)}
        <Router>
          <Navbar clickLogout={this.clearToken} />
          <Switch>
            
            {/* {!this.state.token || this.state.token === '' 
            ? <Route path='/user/login' exact ><Login updateToken={this.updateToken} /></Route> 
            :  <StoreItemsList sessionToken={this.state.token} storeItems={this.state.setStoreItems} fetchStoreItems={this.fetchStoreItems()} /> } */}
            <Route path='/user/register'><Register updateToken={this.updateToken}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken}/></Route>
            <Route path='/' exact ><StoreItemsList sessionToken={this.state.token} storeItems={this.state.storeItems} fetchStoreItems={this.fetchStoreItems}/></Route>
          </Switch>
          
           
          {/* <Register/>
          <Login /> */}
        </Router>
      </div>
    );
  }
}

export default App;
