import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import APIURL from '../../helpers/environment';

type CreateProps = {
  sessionToken: string;
  fetchStoreItems: any;
}

type CreateState = {
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: string;
}

export default class StoreItemCreate extends React.Component<CreateProps, CreateState> {
  constructor (props: CreateProps) {
    super(props);
    this.state = {
      itemName: '',
      color: '',
      description: '',
      price: 0,
      itemNum: 0,
      imgURL: '',
    }
  }

  setName = (e: any) => {
    this.setState({itemName: e.target.value});
  }

  setColor = (e: any) => {
    this.setState({color: e.target.value});
  }

  setDescription = (e: any) => {
    this.setState({description: e.target.value});
  }

  setPrice = (e: any) => {
    this.setState({price: e.target.value});
  }

  setItemNum = (e: any) => {
    this.setState({itemNum: e.target.value});
  }

  setImgURL = (e: any) => {
    this.setState({imgURL: e.target.value});
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `${APIURL}/listing/create`;
    const body = {
      itemName: this.state.itemName,
      color: this.state.color,
      description: this.state.description,
      price: this.state.price,
      itemNum: this.state.itemNum,
      imgURL: this.state.imgURL
    }
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => {
        console.log(rObj)
        this.props.fetchStoreItems()
      })
  }

  render() {
    return (

      <Container component="main" maxWidth="lg">
          <Link to="/admin" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon className="backArrow" /> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </Link>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper" style={{marginTop:'30px'}}>
            <Avatar className="avatar" style={{backgroundColor:'#f50057'}}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ fontFamily:'Montserrat', fontWeight: 900 }}>
              Create Item Listing
            </Typography>
            <form onSubmit={this.handleSubmit} className="formCreateListing" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="itemNameField"
                label="Name"
                name="itemName"
                style={{ fontFamily:'Open Sans' }}
                onChange = {this.setName.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="color"
                label="Color"
                id="color"
                style={{ fontFamily:'Open Sans' }}
                onChange = {this.setColor.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                style={{ fontFamily:'Open Sans' }}
                onChange = {this.setDescription.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price (Do not use $)"
                id="price"
                style={{ fontFamily:'Open Sans' }}
                onChange = {this.setPrice.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="itemNum"
                label="Number"
                id="itemNum"
                style={{ fontFamily:'Open Sans' }}
                onChange = {this.setItemNum.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="imgURL"
                label="Image URL"
                id="imgURL"
                style={{ fontFamily:'Open Sans' }}
                onChange = {this.setImgURL.bind(this)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{marginTop:"1em", marginBottom:'5em', fontFamily:'Open Sans' }}
                className="submitRegister"
              >
                Create Listing
              </Button>
            </form>
          </div>
        </Container>
      </Container>
    )
  }
}