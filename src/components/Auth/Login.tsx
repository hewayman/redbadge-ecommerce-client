import React from 'react';
import { Redirect, Link as LinkTo } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import APIURL from '../../helpers/environment';

type LoginProps = {
  updateToken: any;
  token: string;
  adminStatus: boolean;
}

type LoginState = {
  email: string;
  password: string;
  history: string;
  errorStatus: boolean;
}

export default class Login extends React.Component<LoginProps, LoginState> {
  constructor (props: LoginProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      history: '',
      errorStatus: false
    }
  }

  setEmail = (e: any) => {
    this.setState({email: e.target.value});
  }

  setPassword = (e: any) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `${APIURL}/user/login`
    const body = {
      email: this.state.email,
      password: this.state.password
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => this.props.updateToken(rObj.sessionToken, rObj.user.id, rObj.user.isAdmin, rObj.user.firstName))
      .catch(err => {this.setState({errorStatus: true}); window.alert('Unable to login. Please check email and password and try again.')})
  }

  render() {
    // if user logs in, redirect to home page
    if (this.props.token) {
      return (<Redirect to="/" />)
    } 
    // if there was an error logging in, reset the errorStatus to false
    if (this.state.errorStatus) {
      this.setState({errorStatus: false})
    }
    return (
      <div>
        {/* container for the back arrow */}
        <Container component="main" maxWidth="lg">
          <LinkTo to="/" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon className="backArrow"/> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </LinkTo>
        </Container>
        
        {/* container for the login form */}
        <Container component="main" maxWidth="xs" style={{minHeight:'65vh', marginBottom:'80px'}}>
          <CssBaseline />
          <div className="paper" style={{marginTop:'30px'}}>
            {/* <Avatar className="avatar" style={{backgroundColor:'#f50057'}}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" style={{ fontFamily:'Montserrat', fontWeight: 900, fontSize:'1.2em' }}>
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit} className="formRegister" style={{ fontFamily:'Montserrat' }} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ fontFamily:'Montserrat' }}
                onChange = {this.setEmail.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                style={{ fontFamily:'Montserrat' }}
                autoComplete="current-password"
                onChange = {this.setPassword.bind(this)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                style={{marginTop:"1em", marginBottom:'0.8em', fontFamily:'Open Sans' }}
                className="submitRegister"
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/user/register" variant="body2" style={{ fontFamily:'Montserrat', fontWeight: 900, textDecoration:'none' }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}