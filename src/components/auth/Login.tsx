import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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
  email?: string;
  password?: string;
  updateToken: any;
}

export default class Login extends React.Component<LoginProps> {
  private email: string = '';
  private password: string = '';

  constructor (props: LoginProps) {
    super(props)
    this.state = {
      updateToken: this.props.updateToken
    }
  }

  // getEmail = () => {
  //   console.log(this.email);
  //   return this.email;
  // }

  setEmail = (email: string) => {
    this.email = email;
    console.log(this.email);
  }

  // getPassword = () => {
  //   console.log(this.password);
  //   return this.password;
  // }

  setPassword = (password: string) => {
    this.password = password;
    console.log(this.password);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = 'http://localhost:8080/user/login/';
    const body = {
      email: this.props.email,
      password: this.props.password
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => this.props.updateToken(rObj.sessionToken))
  }

  render() {
    console.log('Login token ' + this.props.updateToken)
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
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
              onChange = {e => this.setEmail(e.target.value)}
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
              onChange = {e => this.setPassword(e.target.value)}
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
    );
  }
}