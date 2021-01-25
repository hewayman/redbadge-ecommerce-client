import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Footer extends React.Component {

  render() {
    return (
      <AppBar position="static" style={{backgroundColor:"#333333", paddingTop:'40px', paddingBottom:'20px', position:'static',
      bottom:0}}>
          <Container maxWidth="md" style={{textAlign:'center'}}>
              <Typography style={{ fontFamily:'Playfair Display', display:'inline-block', fontSize:'2em', color:'#eeeeee', paddingBottom:'10px'}}>Mollie</Typography>
              <Typography style={{ fontFamily:'Montserrat', display:'inline-block', fontSize:'2.2em', fontWeight:200, color:'#eeeeee', paddingRight:'200px', paddingBottom:'10px'}}>Birch</Typography>
            <div style={{display:'inline-block'}}>
              <Typography style={{fontFamily:'Montserrat', fontSize:'0.9em', fontWeight:900}}>Contact Us</Typography>
              <Typography style={{fontFamily:'Montserrat', fontSize:'0.8em'}}>123-456-7890</Typography>
              <Typography style={{fontFamily:'Montserrat', fontSize:'0.8em'}}>contact@molliebirch.com</Typography>
            </div>
            <Toolbar disableGutters={true} style={{borderTop:'0.25px solid #888888', justifyContent:'center'}}>
              <Typography style={{fontFamily:'Montserrat', fontWeight:400, fontSize:'0.8em', color:'#eeeeee'}}>
                © 2021 MollieBirch. All rights reserved.
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    );
  }
}

export default Footer;