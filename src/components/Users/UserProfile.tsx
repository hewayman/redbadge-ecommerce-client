import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import APIURL from '../../helpers/environment';
import IconButton from '@material-ui/core/IconButton';

type UserProfileProps = {
  sessionToken: string;
  userId: number;
  user: any;
}

type UserProfileState = {
  user: any[];
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addressLn1: string;
  addressLn2: string;
  city: string;
  state: string;
  zipcode: number;
  phone: number;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
  constructor (props: UserProfileProps) {
    super(props);
    this.state = {
      user: [],
      active: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      addressLn1: '',
      addressLn2: '',
      city: '',
      state: '',
      zipcode: 0,
      phone: 0,
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

  setAddressLn1 = (e: any) => {
    this.setState({addressLn1: e.target.value});
  }
  
  setAddressLn2 = (e: any) => {
    this.setState({addressLn2: e.target.value});
  }

  setCity = (e: any) => {
    this.setState({city: e.target.value});
  }

  setStateName = (e: any) => {
    this.setState({state: e.target.value});
  }

  setZipcode = (e: any) => {
    this.setState({zipcode: e.target.value});
  }

  setPhone = (e: any) => {
    this.setState({phone: e.target.value});
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `${APIURL}/user/details`;
    const body = {
      firstName: this.state.firstName || this.props.user.firstName,
      lastName: this.state.lastName || this.props.user.lastName,
      email: this.state.email || this.props.user.email,
      password: this.state.password || this.props.user.password,
      addressLn1: this.state.addressLn1 || this.props.user.addressLn1,
      addressLn2: this.state.addressLn2 || this.props.user.addressLn2,
      city: this.state.city || this.props.user.city,
      state: this.state.state || this.props.user.state,
      zipcode: this.state.zipcode || this.props.user.zipcode,
      phone: this.state.phone || this.props.user.phone
    }
  
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => {
        console.log(rObj)
    })
  }

  toggle = () => {
    const showEdit = this.state.active
    this.setState({active: !showEdit})
  }

  render() {
    // if user logs out, redirect to login page
    if (!this.props.sessionToken) {
      return (<Redirect to="/user/login" />)
    } 
    return (
      <Container component="main" maxWidth="lg">
        <Link to="/" style={{textDecoration:'none', color:'black'}}>
          <ArrowBackIosIcon className="backArrow" /> 
          <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
        </Link>
        <Container className="paper" style={{marginTop:'30px'}} maxWidth="sm">
          <Avatar className="avatar" style={{backgroundColor:'#f50057'}}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ fontFamily:'Montserrat', fontWeight:900, display:'inline' }}>
            Edit User Profile
          </Typography>
          {this.props.sessionToken ?
            <form onSubmit={this.handleSubmit} className="formCreateListing" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name={"firstName"}
                autoFocus
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.firstName}
                onChange = {this.setFirstName.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.lastName}
                onChange = {this.setLastName.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                id="email"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.email}
                onChange = {this.setEmail.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.password}
                onChange = {this.setPassword.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="addressLn1"
                label="Address Line 1"
                id="addressLn1"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.addressLn1}
                onChange = {this.setAddressLn1.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="addressLn2"
                label="Address Line 2"
                id="addressLn2"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.addressLn2}
                onChange = {this.setAddressLn2.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.city}
                onChange = {this.setCity.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="state"
                label="State"
                id="state"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.state}
                onChange = {this.setStateName.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="zipcode"
                label="Zip Code"
                id="zipcode"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.zipcode}
                onChange = {this.setZipcode.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                id="phone"
                style={{ fontFamily:'Montserrat' }}
                defaultValue={this.props.user.phone}
                onChange = {this.setPhone.bind(this)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                style={{marginTop:"1em", marginBottom:'5em', fontFamily:'Open Sans' }}
                className="createListingButton">
                Submit
              </Button>
            </form>
            :
            null  
          }
        </Container>
      </Container>
    );
  }
}

export default UserProfile;