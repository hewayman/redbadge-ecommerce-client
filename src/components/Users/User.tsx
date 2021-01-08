import React from 'react';
import { Link} from 'react-router-dom'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CreateIcon from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
// import UserEdit from '../Users/UserEdit'

import Avatar from '@material-ui/core/Avatar';
// import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

type UserProps = {
  user: any;
  key: any;
  classes: any;
  users: any;
  fetchUsers: any;
  sessionToken: any;
}

type UserState ={
  user: any[];
  active: boolean;
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

const styles = (theme: any) => createStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    wrap: 'nowrap',
  },
  media: {
    height: 300,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '0'
  },
})

class User extends React.Component<UserProps, UserState> {
  constructor (props: UserProps) {
    super(props);
    this.state = {
      // searchNodes: '',
      user: [],
      active: false,
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
      firstName: this.state.firstName || this.props.user.firstName,
      lastName: this.state.lastName || this.props.user.lastName,
      isAdmin: this.state.isAdmin || this.props.user.isAdmin,
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
        this.props.fetchUsers()
        this.setState({ active: false }) // turn toggle off after editing user info
      })
    }

  handleClick = () => {
    // this.setState({
    //   itemName: this.props.item.itemName
    // })
    fetch(`http://localhost:8080/user/${this.props.user.id}`, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ user: obj.user }))
  }

  toggle = () => {
    const showEdit = this.state.active
    this.setState({active: !showEdit})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.root} >   
          {/* <CardActionArea onClick={this.handleClick}>             */}
            <Avatar className="avatar" style={{backgroundColor:'#f50057', float:'right', height:'30px', width:'30px'}} onClick={this.toggle}>
              <CreateIcon style={{height:'20px', width:'20px'}}/>
            </Avatar>
            
          {/* display user edit form when create icon has been clicked, otherwise display user info */}
            {this.state.active === false ? (
              <CardContent> 
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.user.firstName  + ' ' + this.props.user.lastName}
                  <br/>
                  {String(this.props.user.isAdmin)}
                  <br/>
                  {this.props.user.email}
                  <br/>
                  {this.props.user.phone}
                  <br/>
                  {this.props.user.addressLn1}
                  <br/>
                  {this.props.user.addressLn2}
                  <br/>
                  {this.props.user.city}
                  <br/>
                  {this.props.user.state}
                  <br/>
                  {this.props.user.zipcode}
                </Typography>
              </CardContent>) : (
              <div className="paper" style={{marginTop:'0em'}}>
                <form onSubmit={this.handleSubmit} onClick={this.handleClick} className="formEditListing" style={{ width: '70%' }} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name={"firstName"}
                    autoFocus
                    value={this.props.user.firstName}
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
                    value={this.props.user.lastName}
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
                    value={this.props.user.isAdmin}
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
                    value={this.props.user.email}
                    onChange = {this.setEmail.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="addressLn1"
                    label="Address Line 1"
                    id="addressLn1"
                    value={this.props.user.addressLn1}
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
                    value={this.props.user.addressLn2}
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
                    value={this.props.user.city}
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
                    value={this.props.user.state}
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
                    value={this.props.user.zipcode}
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
                    value={this.props.user.phone}
                    onChange = {this.setPhone.bind(this)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{marginTop:"1em", marginBottom:'5em'}}
                    className="submitCreate" >
                    Edit Customer
                  </Button>
                </form>
              </div>
            )}
          {/* </CardActionArea> */}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(User);