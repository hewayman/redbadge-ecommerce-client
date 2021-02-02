import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import APIURL from '../../helpers/environment';

type ItemProps = {
  item: any;
  classes: any;
  adminStatus: boolean;
  sessionToken: string;
  fetchStoreItems: any;
  updateItemId: any;
  updateItem: any;
  addToCart: any;
  storeItemObj: any;
}

type ItemState = {
  storeItem: any;
  show: boolean;
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: string;
  active: boolean;
  id: number;
  errorStatus: boolean;
  showBtn: boolean;
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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  }
})

class Item extends React.Component<ItemProps, ItemState> {
  constructor (props: ItemProps) {
    super(props);
      this.state = {
        storeItem: [],
        show: false,
        itemName: '',
        color: '',
        description: '',
        price: 0,
        itemNum: 0,
        imgURL: '',
        active: false,
        id: 0,
        errorStatus: false,
        showBtn: false
      }
      this.handleClick = this.handleClick.bind(this);
  }

  setItemName = (e: any) => {
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
    const url = `${APIURL}/listing/${this.props.item.id}`;
    const body = {
      itemName: this.state.itemName || this.props.item.itemName,
      color: this.state.color || this.props.item.color,
      description: this.state.description || this.props.item.description,
      price: this.state.price || this.props.item.price,
      itemNum: this.state.itemNum || this.props.item.itemNum,
      imgURL: this.state.imgURL || this.props.item.imgURL,
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
        this.props.fetchStoreItems()
        this.setState({ active: false }) // turn toggle off after editing item
      })
      .catch(err => {console.log(err); this.setState({errorStatus: true})})
  }

  handleClick = () => {
    this.props.updateItemId(this.props.item.id)
    this.props.updateItem(this.props.item)
  }

  showCartButton = () => {
    this.setState({ showBtn: true })
  }

  hideCartButton = () => {
    this.setState({ showBtn: false })
  }

  deleteListing = () => {
    fetch(`${APIURL}/listing/${this.props.item.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    }) 
    .then(() => this.props.fetchStoreItems())
    .catch(err => console.log(err))
  }

  // toggle to show edit/delete options
  toggle = () => {
    const showEdit = this.state.active
    this.setState({active: !showEdit})
  }

  render() {
    const { classes } = this.props;
     // if there is an issue fetching data, redirect to home page
     if (this.state.errorStatus) {
      return (<Redirect to="/" />)
    } 
    return (
      <div className={classes.root} >
        <Card className={classes.root} style={{borderRadius:'0px', border:'none', position:'relative'}} variant="outlined" onMouseOver={this.showCartButton} onMouseLeave={this.hideCartButton} >
        {/* if the user is an admin, show the delete button */}
          {this.props.adminStatus ?    
            <IconButton className="deleteButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} 
              onClick={e =>
                      window.confirm("Are you sure you wish to delete this item?") && this.deleteListing()
              }>
              <DeleteIcon style={{height:'25px', width:'25px'}}/>
            </IconButton>
            :
            null
          }
        {/* if the user is an admin, show the edit button */}
          {this.props.adminStatus ?    
            <IconButton className="createButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} onClick={this.toggle}>
              <CreateIcon style={{height:'25px', width:'25px'}}/>
            </IconButton>
            :
            null
          }
          
        {/* display user edit form when create icon has been clicked, otherwise display user info */}
          {this.state.active === false ? 
            <>
              <Link to={`/listing/${this.props.item.id}`} style={{textDecoration:'none', color:'black'}}>
              <CardActionArea>            
                <CardMedia
                  className="media"
                  image={`/assets/${this.props.item.imgURL}.jpg`}
                  title="furniture"
                  style={{height: 200, paddingTop: '56.25%'}}
                  onClick={this.handleClick}
                />
                </CardActionArea>
              </Link>
              {this.state.showBtn ? 
                <Button 
                  className="addCartButton"
                  variant="contained" 
                  color="secondary" 
                  onClick={() => this.props.addToCart(this.props.item)}
                  style={{position:'absolute', fontFamily:'Open Sans'}}>
                  Add to Cart
                </Button>
                :
                null
              }
              <Link to={`/listing/${this.props.item.id}`} style={{textDecoration:'none', color:'black'}}>
                <CardContent style={{paddingBottom:'1em', paddingTop:'0', paddingLeft:'0', marginBottom:'2em'}} onClick={this.handleClick}>
                  <Typography variant="body2" color="textSecondary" component="h2" style={{padding:'0.4em 0 0 0', fontFamily:'Montserrat', fontWeight:900, fontSize:'1.4em', textTransform:"capitalize", color:'black'}}>
                    {this.props.item.itemName}
                  </Typography>                
                  <Typography variant="body2" color="textSecondary" component="p" style={{fontFamily:'Montserrat', fontWeight:'bold', fontSize:'16px'}}>
                    ${this.props.item.price.toLocaleString()}
                  </Typography>
                </CardContent>
              </Link>
            </>
          :
            <div className="paper" style={{marginTop:'0em'}}>
              <form onSubmit={this.handleSubmit} className="formEditListing" style={{ width: '70%', fontFamily:'Open Sans' }} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="itemNameField"
                  label="Item Name"
                  name="itemName"
                  autoFocus
                  defaultValue={this.props.item.itemName}
                  onChange = {this.setItemName.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemColor"
                  label="Color"
                  id="itemColor"
                  defaultValue={this.props.item.color}
                  onChange = {this.setColor.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemDescription"
                  label="Description"
                  id="itemDescription"
                  defaultValue={this.props.item.description}
                  onChange = {this.setDescription.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemPrice"
                  label="Price (Do not include $)"
                  id="itemPrice"
                  defaultValue={this.props.item.price}
                  onChange = {this.setPrice.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemNum"
                  label="Item Number"
                  id="itemNum"
                  defaultValue={this.props.item.itemNum}
                  onChange = {this.setItemNum.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="image"
                  label="Image URL"
                  id="image"
                  defaultValue={this.props.item.imgURL}
                  onChange = {this.setImgURL.bind(this)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{marginTop:"1em", marginBottom:'5em', fontFamily:'Open Sans'}}
                  className="submitEdit" >
                  Edit Listing
                </Button>
              </form>
            </div>
          }
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Item);