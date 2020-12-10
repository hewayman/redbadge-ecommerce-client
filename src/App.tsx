import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/site/Navbar'

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar/>
        <Router>

        </Router>
      </div>
    );
  }
}

export default App;
