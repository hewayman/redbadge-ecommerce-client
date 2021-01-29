import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BottomNavigation } from '@material-ui/core';

class Footer extends React.Component {

  render() {
    return (
      <footer
      // style={{backgroundColor:"#333333", 
      // height: '200px', paddingTop:'30px', paddingBottom:'10px', 
      // position:'static',
      // bottom:0
    // }}
      >
          <Container maxWidth="md" style={{textAlign:'center'}}>
            <div className="footerStoreName">
              <h2 className="footerMollie" style={{ fontFamily:'Playfair Display', color:'#eeeeee'}}>Mollie</h2>
              <h2 className="footerBirch" style={{ fontFamily:'Montserrat', fontWeight:200, color:'#eeeeee'}}>Birch</h2>
            </div>
            <div className="footerContact" style={{display:'inline-block'}}>
              <Typography style={{fontFamily:'Montserrat', fontSize:'0.9em', fontWeight:900}}>Contact Us</Typography>
              <Typography style={{fontFamily:'Montserrat', fontSize:'0.8em'}}>123-456-7890</Typography>
              <Typography style={{fontFamily:'Montserrat', fontSize:'0.8em'}}>contact@molliebirch.com</Typography>
            </div>
            <Toolbar disableGutters={true} style={{borderTop:'0.25px solid #888888', justifyContent:'center'}}>
              <Typography className="footerRights" style={{fontFamily:'Montserrat', fontWeight:400, fontSize:'0.8em', color:'#eeeeee'}}>
                © 2021 MollieBirch. All rights reserved.
              </Typography>
            </Toolbar>
          </Container>
        </footer>
    );
  }
}

export default Footer;