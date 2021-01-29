import React from 'react';
import { Redirect, Link as LinkTo } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
    const url = 'http://localhost:8080/user/login/';
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
    if (this.state.errorStatus) {
      // window.alert('Unable to login. Please check email and password and try again.')
      this.setState({errorStatus: false})
    }
    return (
      <div>
        <Container component="main" maxWidth="lg">
          <LinkTo to="/" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon className="backArrow"/> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </LinkTo>
        </Container>
        
        <Container component="main" maxWidth="xs" style={{minHeight:'65vh', marginBottom:'80px'}}>
          <CssBaseline />
          <div className="paper" style={{marginTop:'30px'}}>
            <Avatar className="avatar" style={{backgroundColor:'#f50057'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ fontFamily:'Open Sans' }}>
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit} className="formRegister" style={{ fontFamily:'Open Sans' }} noValidate>
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
                autoComplete="current-password"
                onChange = {this.setPassword.bind(this)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{marginTop:"1em", marginBottom:'0.8em', fontFamily:'Open Sans' }}
                className="submitRegister"
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/user/register" variant="body2" style={{ fontFamily:'Open Sans' }}>
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