import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import Login from './Login';
import { type } from 'os';

// type NavbarProps = {
//   siteName?: string;
//   username?: string;
// }

type NavbarState = {
  sidebar: boolean;
}

export default class Navbar extends React.Component<{}, NavbarState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      sidebar: false
    }
  }
  
  // const [sidebar, setSidebar] = useState({});

  showSidebar = () => () => {
    const [sidebar, setSidebar] = useState({})
    setSidebar(!sidebar)

    return setSidebar;
  } 
  
  render () {
    return (
      <>
        <div>
          <Link to="#" className='menu-account'>
            <AccountCircleIcon />
          </Link>
        </div>
        {/* <nav className={this.showSidebar ? 'nav-menu active' : 'nav-menu'}> */}
        <nav className={this. ? console.log('active') : console.log('not active')}>
          <ul className='nav-menu-items' onClick={this.showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-account'>
                <CloseIcon />
              </Link>
            </li>
          </ul>
        </nav>

        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="storeName">
              <Link to="/">Store Name</Link>
            </Typography> */}
            {/* <Button color="inherit">Cart</Button>
            <IconButton edge="start" className="cartIconButton" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <Typography className="welcomeText">
              Welcome, User
            </Typography>
            <IconButton edge="start" className="accountIconButton" color="inherit" aria-label="menu">
              <Route path="/Login" component={Login}><AccountCircleIcon /></Route> */}
              {/* <AccountCircleIcon /> */}
            {/* </IconButton> */}
          {/* </Toolbar>
        </AppBar> */}
        
      </>
    )
  }
}

// export default Navbar;