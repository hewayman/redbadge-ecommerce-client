import React from 'react';
import { Redirect, Link as LinkTo } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Register from './Register';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Store Name
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

type LoginProps = {
  updateToken: any;
  token: any;
  adminStatus: boolean;
  // fetchUsers: any;
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
          <LinkTo to="/" >
            <ArrowBackIosIcon style={{marginTop:'130px'}}/> Back
          </LinkTo>
        </Container>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper" style={{marginTop:'30px'}}>
            <Avatar className="avatar" style={{backgroundColor:'#f50057'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit} className="formRegister" noValidate>
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{marginTop:"1em", marginBottom:'0.8em'}}
                className="submitRegister"
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/user/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}