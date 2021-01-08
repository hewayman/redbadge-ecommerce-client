import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

type UserEditProps = {
  users: any;
  fetchUsers: any;
  sessionToken: any;
}

type UserEditState = {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  email: string;
  password: string;
  addressLn1: string;
  addressLn2: string;
  city: string;
  state: string;
  zipcode: number;
  phone: number;
}

class UserEdit extends React.Component<UserEditProps, UserEditState> {
  constructor (props: UserEditProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      isAdmin: false,
      email: '',
      password: '',
      addressLn1: '',
      addressLn2: '',
      city: '',
      state: '',
      zipcode: 0,
      phone: 0
    }
  }

  setFirstName = (e: any) => {
    this.setState({firstName: e.target.value});
  }

  setLastName = (e: any) => {
    this.setState({lastName: e.target.value});
  }

  setIsAdmin = (e: any) => {
    this.setState({isAdmin: e.target.value});
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
    const url = 'http://localhost:8080/user/details';
    const body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAdmin: this.state.isAdmin,
      email: this.state.email,
      password: this.state.password,
      addressLn1: this.state.addressLn1,
      addressLn2: this.state.addressLn2,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      phone: this.state.phone
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
        this.props.fetchUsers()
      })
  }

  render() {
    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar" style={{backgroundColor:'white', color:'black'}}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Customer Information
          </Typography>
          <form onSubmit={this.handleSubmit} className="formEditListing" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
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
              onChange = {this.setLastName.bind(this)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="isAdmin"
              label="Admin Access (true or false)"
              id="isAdmin"
              onChange = {this.setIsAdmin.bind(this)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              onChange = {this.setEmail.bind(this)}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange = {this.setPassword.bind(this)}
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="addressLn1"
              label="Address Line 1"
              id="addressLn1"
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
              onChange = {this.setStateName.bind(this)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="zipcode"
              label="Zipcode"
              id="zipcode"
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
              onChange = {this.setPhone.bind(this)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{marginTop:"1em", marginBottom:'5em'}}
              className="submitCreate"
            >
              Edit Customer
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default UserEdit;