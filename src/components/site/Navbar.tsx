import React from 'react'
import { Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import CreateIcon from '@material-ui/icons/Create'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import LockIcon from '@material-ui/icons/Lock'

type NavbarProps = {
  clickLogout: any
}

class Navbar extends React.Component<NavbarProps> {
  render () {
    return (
      <div>
        <AppBar style={{ background: '#fafafa', color: "rgba(0, 0, 0, 0.87)", borderBottom: "1px solid #cccccc", display: "flex"}} elevation={0} >
          <Toolbar>
            <Typography variant="h6" className="storeName">
              <Link to="/" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)', marginRight: '16px'}}>MollieBurch</Link>
            </Typography>
            {/* <Button color="inherit">Cart</Button> */}
            <Typography className="welcomeText" style={{marginLeft: "auto"}}>
              Welcome!
            </Typography>
            <IconButton edge="start" className="createListingButton" color="inherit" aria-label="menu">
              <Link to='/listing/create' style={{color: 'rgba(0, 0, 0, 0.87)', padding: '0.3em 0 0 0.4em'}} >
                <CreateIcon />
              </Link>
            </IconButton>
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