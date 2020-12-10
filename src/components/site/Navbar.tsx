import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class Navbar extends React.Component {
  render () {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="storeName">
              Store Name
            </Typography>
            {/* <Button color="inherit">Cart</Button> */}
            <IconButton edge="start" className="cartIconButton" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <Typography className="welcomeText">
              Welcome, User
            </Typography>
            <IconButton edge="start" className="accountIconButton" color="inherit" aria-label="menu">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Navbar;