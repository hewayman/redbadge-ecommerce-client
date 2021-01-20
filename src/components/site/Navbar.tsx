import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

type NavbarProps = {
  clickLogout: any;
  sessionToken: string;
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
      .catch(err => console.log(err))
  }

  handleSearch = () => {
    fetch(`http://localhost:8080/listing/name/${this.state.searchTerm}`, {
      method: 'GET'
    })
    .then(r => r.json())
    .then(obj => { this.props.updateSearch(obj.item )
      console.log(obj.item)
    })
    .catch(err => console.log(err))
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
        {/* <AppBar style={{ background:'#33333d', color:"white", height:'40px', display: "flex", textAlign:'center', justifyContent:'center', fontFamily:'Open Sans'}} elevation={0}>
          <Typography style={{ fontFamily:'Open Sans' }}>
            TAKE 10% OFF ALL ITEMS
          </Typography>
        </AppBar> */}
        <AppBar style={{ background: 'white', color: "rgba(0, 0, 0, 0.87)", borderBottom: "1.2px solid #cccccc", display: "flex", padding:'0.5em 0 0.5em 0'}} elevation={0} >
        <Container maxWidth="lg">
          <Toolbar disableGutters={true}>
            <Typography variant="h6" className="storeName">
              <Link to="/" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)', marginRight: '16px', fontFamily:'Open Sans', fontSize:'24px'}} onClick={this.props.fetchStoreItems}>
                <Typography style={{ fontFamily:'Playfair Display', display:'inline-block', fontSize:'1.5em'}}>Mollie</Typography>
                <Typography style={{ fontFamily:'Montserrat', display:'inline-block', fontSize:'1.6em'}}>Birch</Typography>
              </Link>
            </Typography>
            <div className="search" style={{position: 'relative', marginLeft: 'auto', marginRight: '1.9em', 
              padding: '0 0 0 0.6em', borderRadius: '4px', border: '1px solid grey', fontFamily:'Open Sans', backgroundColor:'white'}}>
              <InputBase
                placeholder="Search"
                id="searchTerm"
                style={{ fontFamily:'Open Sans', backgroundColor:'white' }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.setSearch.bind(this)}
              />
              <IconButton edge="start" size="small" className="accountIconButton" color="inherit" aria-label="menu" onClick={this.handleSearch}>
                <SearchIcon />
              </IconButton>
            </div>
          {/* if the user is logged in, display a welcome message with the user's name */}
            {this.props.userFirstName ?
              <Typography className="welcomeText" style={{ fontFamily:'Open Sans' }}>
                Welcome, {this.props.userFirstName}!
              </Typography> :
              null
            } 
          {/* if the user is an admin, show the admin portal button */}
            {this.props.adminStatus ? 
              <IconButton edge="start" className="adminButton" color="inherit" aria-label="menu" >
                <Link to='/user/admin' style={{color: 'rgba(0, 0, 0, 0.87)', padding: '0.3em 0 0 0.4em'}} >
                  <SupervisorAccountOutlinedIcon />
                </Link>
              </IconButton> :
              null
            }
          {/* display the login, shopping cart, and logout buttons for all users*/}
            <IconButton edge="start" className="accountIconButton" color="inherit" aria-label="menu">
              <Link to='/user/login' style={{color: 'rgba(0, 0, 0, 0.87)', padding: '0.3em 0 0 0.4em'}} >
                <AccountCircleOutlinedIcon />
              </Link>
            </IconButton>
            <IconButton edge="start" className="cartIconButton" color="inherit" aria-label="menu">
              <Link to='/cart' style={{color: 'rgba(0, 0, 0, 0.87)', padding: '0.3em 0 0 0.4em'}} >
                <ShoppingCartOutlinedIcon />
              </Link>
            </IconButton>
            <IconButton onClick={this.props.clickLogout} edge="start" className="lockIconButton" color="inherit" aria-label="menu">
                <LockOutlinedIcon />
            </IconButton>
          </Toolbar>
          </Container>
        </AppBar>
      </div>
    )
  }
}

export default Navbar;