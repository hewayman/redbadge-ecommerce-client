import React from 'react';
import { Redirect, Link as LinkTo } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import APIURL from '../../helpers/environment';

type RegisterProps = {
  updateToken: any;
  token: string;
}

type RegisterState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class Register extends React.Component<RegisterProps, RegisterState> {
  constructor (props: RegisterProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  setFirstName = (e: any) => {
    this.setState({firstName: e.target.value});
  }

  setLastName = (e: any) => {
    this.setState({lastName: e.target.value});
  }

  setEmail = (e: any) => {
    this.setState({email: e.target.value});
  }

  setPassword = (e: any) => {
    this.setState({password: e.target.value});
  }
  
  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `${APIURL}/user/register`;
    const body = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAdmin: false
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
  }

  render() {
    console.log(this.props.updateToken)
    // if user logs in, redirect to home page
    if (this.props.token) {
      return (<Redirect to="/" />)
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
            <Typography component="h1" variant="h5" style={{ fontFamily:'Montserrat', fontWeight: 900 }}>
              Register
            </Typography>
            <form onSubmit={this.handleSubmit} className="formRegister" style={{ fontFamily:'Montserrat' }} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    style={{ fontFamily:'Montserrat' }}
                    onChange = {this.setFirstName.bind(this)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    style={{ fontFamily:'Montserrat' }}
                    onChange = {this.setLastName.bind(this)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    style={{ fontFamily:'Montserrat' }}
                    onChange = {this.setEmail.bind(this)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    style={{ fontFamily:'Montserrat' }}
                    onChange = {this.setPassword.bind(this)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                style={{marginTop:"1.1em", marginBottom:'0.8em', fontFamily:'Open Sans' }}
                className="submitRegister"
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/user/login" variant="body2" style={{ fontFamily:'Montserrat', fontWeight: 900, textDecoration:'none' }}>
                    Already have an account? Sign in
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