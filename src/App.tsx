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
}

class App extends React.Component <{}, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      // sessionToken: this.props.sessionToken
      token: '',
      newToken: '',
      setStoreItems: ''
    }
  }

  fetchStoreItems = () => {
    fetch('http://localhost:8080/listing/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(rArr => this.state.setStoreItems(rArr))
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
  }

  render() {
   
    return (
      <div> 
        {console.log("App token " + this.state.token)}
        <Router>
          <Navbar clickLogout={this.clearToken} />
          <Switch>
            {/* <Route path='/' exact component={Home}/> */}
            {!this.state.token || this.state.token === '' 
            ? <Route path='/user/login' exact ><Login updateToken={this.updateToken} /></Route> 
            :  <StoreItemsList sessionToken={this.setState} storeItems={this.state.setStoreItems}/> }
            <Route path='/user/register'><Register updateToken={this.updateToken}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken}/></Route>
          </Switch>
          {/* <StoreItemsList storeItems={this.state.setStoreItems} /> */}
          {/* fetchStoreItems={this.fetchStoreItems()}  */}
          {/* <Register/>
          <Login /> */}
        </Router>
      </div>
    );
  }
}

export default App;
