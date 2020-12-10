import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/site/Navbar'
import Register from './components/site/Register'

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar/>
        <Router>
          <Register/>
        </Router>
      </div>
    );
  }
}

export default App;
