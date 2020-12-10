import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/site/Navbar'
import Register from './components/site/Register'
import Login from './components/site/Login'

class App extends React.Component {

  render() {
    return (
      <div> 
        <Router>
          <Navbar/>
          <Switch>

          </Switch>
          {/* <Register/>
          <Login /> */}
        </Router>
      </div>
    );
  }
}

export default App;
