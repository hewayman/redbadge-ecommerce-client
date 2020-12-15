import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/site/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
 
type AppState = {
  token: string,
  // firstName?: string;
  // lastName?: string;
  // email?: string;
  // password?: string;
  newToken: string;
}

class App extends React.Component <{}, AppState> {

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
            {/* {!this.state.token || this.state.token === '' 
            ? <Route path='/user/login' exact ><Login updateToken={this.updateToken} /></Route> 
            : (console.log('test'))} */}
            <Route path='/user/register'><Register updateToken={this.updateToken}/></Route>
            <Route path='/user/login' exact ><Login updateToken={this.updateToken}/></Route>
          </Switch>
          {/* <Register/>
          <Login /> */}
        </Router>
      </div>
    );
  }
}

export default App;
