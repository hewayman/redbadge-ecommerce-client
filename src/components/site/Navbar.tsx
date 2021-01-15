import React from 'react';
import { Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LockIcon from '@material-ui/icons/Lock';

type NavbarProps = {
  clickLogout: any;
  sessionToken: any;
  adminStatus: boolean;
  userFirstName: string;
  fetchStoreItems: any;
  searchItems: any[];
  updateSearch: any;
  // avgRating: any
}

type NavbarState = {
  searchTerm: string;
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor (props: NavbarProps) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  // automatically creates admin account when the '/user/admin' endpoint is reached
  createAdmin = () => {
    const url = 'http://localhost:8080/user/admin';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(rObj => {
        console.log(rObj)
      })
  }

  handleSearch = () => {
    fetch(`http://localhost:8080/listing/name/${this.state.searchTerm}`, {
      method: 'GET'
    })
    .then(r => r.json())
    .then(obj => { this.props.updateSearch(obj.item )
      console.log(obj.item)
    })
  }

  setSearch = (e: any) => {
    if (e.target.value) {
      this.setState({ searchTerm: e.target.value });
    } else {
      this.props.fetchStoreItems()
    }
    
  }

  render () {
    return (
      <div>
        <AppBar style={{ background: '#fafafa', color: "rgba(0, 0, 0, 0.87)", borderBottom: "1px solid #cccccc", display: "flex"}} elevation={0} >
          <Toolbar>
            <Typography variant="h6" className="storeName">
              <Link to="/" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)', marginRight: '16px'}} onClick={this.props.fetchStoreItems}>Store Name</Link>
            </Typography>
            <div className="search" style={{position: 'relative', marginLeft: 'auto', marginRight: '1.9em', 
              padding: '0 0 0 0.6em', borderRadius: '4px', border: '1px solid grey'}}>
              <InputBase
                placeholder="Search"
                id="searchTerm"
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.setSearch.bind(this)}
              />
              <IconButton edge="start" size="small" className="accountIconButton" color="inherit" aria-label="menu" onClick={this.handleSearch}>
                <SearchIcon />
              </IconButton>
            </div>
          {/* if the user is logged in, display a welcome message with the user's name */}
            {this.props.userFirstName ?
              <Typography className="welcomeText" >
                Welcome, {this.props.userFirstName}!
              </Typography> :
              null
            } 
          {/* if the user is an admin, show the admin portal button */}
            {this.props.adminStatus ? 
              <IconButton edge="start" className="adminButton" color="inherit" aria-label="menu" >
                <Link to='/user/admin' style={{color: 'rgba(0, 0, 0, 0.87)', padding: '0.3em 0 0 0.4em'}} >
                  <SupervisorAccountIcon />
                </Link>
              </IconButton> :
              null
            }
          {/* display the login, shopping cart, and logout buttons for all users*/}
            <IconButton edge="start" className="accountIconButton" color="inherit" aria-label="menu">
              <Link to='/user/login' style={{color: 'rgba(0, 0, 0, 0.87)', padding: '0.3em 0 0 0.4em'}} >
                <AccountCircleIcon />
              </Link>
            </IconButton>
            <IconButton edge="start" className="cartIconButton" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton onClick={this.props.clickLogout} edge="start" className="lockIconButton" color="inherit" aria-label="menu">
                <LockIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Navbar;