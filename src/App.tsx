import React from 'react';
// import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/site/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Auth'
 
type AppState = {
  token: string,
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  newToken: string;
}

class App extends React.Component <{}, AppState> {
  // constructor(props: AppProps) {
  //   super(props);
  //     this.state = {
  //       token: localStorage.getItem('token'),
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       password: '',
  //     };
  //     // this.handleFirstName = this.handleFirstName.bind(this);
  //     this.setToken = this.setToken.bind(this)
  // }

  state: AppState = {
    token: '',
    firstName: '',
    newToken: ''
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({token: token})
    } else {
      this.setState({token: localStorage.getItem('token') || ''}) 
    }
    // this.setState({
      // token: localStorage.getItem('token')
    localStorage.setItem('token', token)
    // })
  }

  updateToken = (newToken: any) => {
    localStorage.setItem('token', newToken);
    this.setState({token: newToken});
  }

  componentWillMount() {
    this.setToken('')
  }
  
  
  // componentDidMount() {
  //   fetch('http://localhost:8080/listing', {
  //       method: 'GET'
  //   }).then(r => r.json())
  //     .then(listings => this.list())
  // }

  render() {
   
    // const { token } = this.state;

    return (
      <div> 
        {console.log(this.state.token)}
        <Router>
          <Navbar />
          <Switch>
            {/* <Route path='/' exact component={Home}/> */}
            <Route path='/user/login' exact ><Login setToken={this.setToken}/></Route>
            <Route path='/user/register'><Register updateToken={this.updateToken}/></Route>
          </Switch>
          {/* <Register/>
          <Login /> */}
        </Router>
      </div>
    );
  }
}

export default App;
