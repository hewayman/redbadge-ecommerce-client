import React from 'react';
import { Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LockIcon from '@material-ui/icons/Lock';

type NavbarProps = {
  clickLogout: any
}

class Navbar extends React.Component<NavbarProps> {
  render () {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className="storeName">
              <Link to="/">Store Name</Link>
            </Typography>
            {/* <Button color="inherit">Cart</Button> */}
            <IconButton edge="start" className="cartIconButton" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <Typography className="welcomeText">
              Welcome, User
            </Typography>
            <IconButton edge="start" className="accountIconButton" color="inherit" aria-label="menu">
              <Link to='/user/login'>
                <AccountCircleIcon />
              </Link>
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