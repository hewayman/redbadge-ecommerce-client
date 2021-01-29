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
import './../../App.css'

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
        {/* <AppBar style={{ background:'#333333', color:"white", height:'30px', display: "flex", textAlign:'center', justifyContent:'center'}} elevation={0}>
          <Typography style={{ fontFamily:'Montserrat', fontSize:'0.9em' }}>
            Free Shipping Over $100
          </Typography>
        </AppBar> */}
        <AppBar className="navbar" style={{ background: 'white', color: "rgba(0, 0, 0, 0.87)", borderBottom: "1.2px solid #cccccc", display: "flex", padding:'0.5em 0 0.5em 0'}} elevation={0} >
        <Container className="navbarContainer" maxWidth="lg">
          <Toolbar className="navbarToolbar" disableGutters={true}>
            {/* <Typography > */}
              <Link to="/" className="storeName" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)', fontFamily:'Open Sans', fontSize:'24px'}} onClick={this.props.fetchStoreItems}>
                <h1 className="storeNameMollie" style={{ fontFamily:'Playfair Display'}}>Mollie</h1>
                <h1 className="storeNameBirch" style={{ fontFamily:'Montserrat'}}>Birch</h1>
              </Link>
            {/* </Typography> */}
            <div className="search" >
              <InputBase
                placeholder="Search"
                id="searchTerm"
                style={{ fontFamily:'Montserrat', backgroundColor:'white' }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.setSearch.bind(this)}
              />
              <IconButton edge="start" size="small" className="searchButton" color="inherit" aria-label="menu" onClick={this.handleSearch}>
                <SearchIcon />
              </IconButton>
            </div>
          {/* if the user is logged in, display a welcome message with the user's name */}
            {this.props.userFirstName ?
              <Typography className="welcomeText" style={{ fontFamily:'Montserrat', fontWeight:'bold' }}>
                Welcome, {this.props.userFirstName}!
              </Typography> :
              null
            } 
            <div className="">
            {/* if the user is an admin, show the admin portal button */}
              {this.props.adminStatus ? 
                <IconButton className="adminButton" color="inherit" aria-label="menu" >
                  <Link to='/admin' style={{color: 'rgba(0, 0, 0, 0.87)'}} >
                    <SupervisorAccountOutlinedIcon />
                  </Link>
                </IconButton> :
                null
              }
            {/* display the login, shopping cart, and logout buttons for all users*/}
              <IconButton edge="start" className="accountIconButton" color="inherit" aria-label="menu" style={{padding: '9px 12px 9px 12px', marginTop:'4px'}}>
                <Link to='/user/login' style={{color: 'rgba(0, 0, 0, 0.87)'}} >
                  <AccountCircleOutlinedIcon />
                </Link>
              </IconButton>
              <IconButton edge="start" className="cartIconButton" color="inherit" aria-label="menu" style={{padding: '9px 12px 9px 12px', marginTop:'5px'}}>
                <Link to='/cart' style={{color: 'rgba(0, 0, 0, 0.87)'}} >
                  <ShoppingCartOutlinedIcon />
                </Link>
              </IconButton>
              <IconButton onClick={this.props.clickLogout} edge="start" className="lockIconButton" color="inherit" aria-label="menu">
                  <LockOutlinedIcon />
              </IconButton>
            </div>
          </Toolbar>
          </Container>
        </AppBar>
      </div>
    )
  }
}

export default Navbar;