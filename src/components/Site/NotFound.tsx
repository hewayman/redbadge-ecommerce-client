import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class NotFound extends React.Component {
  render() {
    return (
      // displays an page not found error message when the user hits an endpoint that does not exist
      <Container component="main" maxWidth="lg" >
        <Link to="/" style={{textDecoration:'none', color:'black'}}>
          <ArrowBackIosIcon style={{marginTop:'130px', marginRight:'-7px' }}/> 
          <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
        </Link>
        <Container component="main" maxWidth="sm" style={{minHeight: '65vh'}}>
          <h1 style={{fontWeight:200, fontSize:'2em', fontFamily:'Open Sans', marginBottom:0}}>Oops! Page not found.</h1>
          <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
        </Container>
      </Container>
    );
  }
}

export default NotFound;