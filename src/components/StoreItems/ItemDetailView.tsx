import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Reviews from './../Reviews/Reviews';
import StarBorderIcon from '@material-ui/icons/StarBorder';

type ItemProps = {
  sessionToken: any;
  storeItemId: number;
  classes: any;
  userId: number;
  adminStatus: boolean;
  addToCart: any;
  storeItemObj: any;
}

type ItemState = {
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: string;
  reviews: any[];
  imgPath: string;
  totalRating: number;
  count: number;
  avgRating: number;
  errorStatus: boolean;
  active: boolean;
  rating: number;
  review: string;
  date: string;
  // cart: any[];
}

const styles = (theme: any) => createStyles({
  root: {
    // display: 'flex',
    // display: 'inline-block'
  },
  details: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
})

class ItemDetailView extends React.Component<ItemProps, ItemState> {
  constructor (props: ItemProps) {
    super(props);
    this.state = {
      itemName: '',
      color: '',
      description: '',
      price: 0,
      itemNum: 0,
      imgURL: '',
      reviews: [],
      imgPath: '',
      totalRating: 0,
      count: 0,
      avgRating: 0,
      errorStatus: false,
      active: false,
      rating: 0,
      review: '',
      date: '',
      // cart: []
    } 
    // this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  setRating = (e: any) => {
    this.setState({rating: e.target.value});
  }

  setReview = (e: any) => {
    this.setState({review: e.target.value});
  }

  setDate = (e: any) => {
    this.setState({date: e.target.value});
  }

  getItemDetails = () => {
    fetch(`http://localhost:8080/listing/${this.props.storeItemId}`, {
      method: 'GET'
    }).then(r => r.json())
      .then(obj => {
        this.setState({ 
          itemName: obj.listing.itemName,
          color: obj.listing.color,
          description: obj.listing.description,
          price: obj.listing.price,
          itemNum: obj.listing.itemNum,
          imgURL: obj.listing.imgURL
        })
      })
      .catch(err => {this.setState({errorStatus: true})})
  }

  getItemReviews = () => {
    fetch(`http://localhost:8080/review/item/${this.props.storeItemId}`, {
      method: 'GET'
    }).then(r => r.json())
      .then(obj => {
        this.setState({ 
          reviews: obj
        })
        // console.log(obj)
    })
    .catch(err => {this.setState({errorStatus: true})})
  }
  

  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = 'http://localhost:8080/review/create';
    const body = {
      rating: this.state.rating,
      review: this.state.review,
      date: this.state.date,
      userId: this.props.userId,
      storeitemId: this.props.storeItemId
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
        this.getItemReviews()
        this.setState({ active: false }) // turn toggle off after creating review
      })
      .catch(err => console.log(err, this.props.userId, this.props.storeItemId))
  }

  toggle = () => {
    const showEdit = this.state.active
    this.setState({active: !showEdit})
  }

  calculateTotalRating = (rating: any) => {
    this.setState(prevState => {
      return {
        totalRating: (prevState.totalRating + rating),
        count: (prevState.count + 1),
        avgRating: (prevState.totalRating + rating) / (prevState.count + 1)
      }
    })
  }

  componentDidMount = () => {
    this.getItemDetails();
    this.getItemReviews();
  }
  
  render() {
    const { classes } = this.props;
    // if there is an issue fetching data, redirect to home page
    if (this.state.errorStatus) {
      return (<Redirect to="/" />)
    } 
    // {console.log('totalrating', this.state.totalRating, 'count', this.state.count, 'avgRating', this.state.avgRating)}
    return (
      <div>
        <Container component="main" maxWidth="lg">
          <Link to="/" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon className="backArrow" /> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </Link>
        
          <Card className="listingCard" style={{borderRadius:'0px', border:'none'}} variant="outlined">
            {this.state.imgURL ? 
              <CardMedia
                className="listingImg"
                image={require(`../../assets/${this.state.imgURL}.jpg`).default}
                title="Listing img"
                // style={{height: 200, width: '60%', paddingTop: '35%'}}
              />
            : null}
            <div className="listingDetails">
              <CardContent className={classes.content} >
                <h2 id="itemName" style={{ fontFamily:'Montserrat'}}>
                  {this.state.itemName}
                </h2>
                <Rating name="size-medium" value={this.state.avgRating} precision={0.5} readOnly /> 
                <h3 className="listingDesc" style={{ fontFamily:'Open Sans', textTransform:'capitalize' }}>
                  ${this.state.price.toLocaleString()}
                  <br/>
                  Color: {this.state.color}
                </h3>
                <p className="listingDesc" style={{ fontFamily:'Open Sans' }}>
                  <br/>
                  {this.state.description}
                  <br/>
                  <br/>
                  Item: {this.state.itemNum}
                </p>
                <Button variant="contained" color="secondary" style={{width:'98%', marginTop:'3em', fontFamily:'Open Sans'}} onClick={() => this.props.addToCart(this.props.storeItemObj)}>
                  Add to Cart
                </Button>
              </CardContent>
            </div>
          </Card>
        </Container>
        <Container maxWidth="sm" style={{ marginTop:"6em", marginBottom:'4em' }}>
          <Grid container spacing={2} alignItems="center" style={{justifyContent: 'center'}}>
            {!this.props.sessionToken ? 
              <Button variant="outlined" disabled style={{width:'98%', marginBottom:'1em', fontFamily:'Open Sans' }}>
                Sign-in to Leave Review
              </Button> :
              <Button variant="outlined" style={{width:'98%', marginBottom:'1em'}} onClick={this.toggle}>
                Write A Review
                </Button>}
            {this.state.active ?
            <div className="paper" style={{marginTop:'0em'}}>
              <form onSubmit={this.handleSubmit} className="formEditListing" style={{ width: '70%', fontFamily:'Open Sans' }} noValidate>
                <Rating
                  name="customized-empty"
                  defaultValue={0}
                  // value={this.state.rating}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  onClick={this.setRating.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="review"
                  label="Review"
                  id="review"
                  style={{ fontFamily:'Open Sans' }}
                  onChange = {this.setReview.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="date"
                  name="date"
                  id="date"
                  style={{ fontFamily:'Open Sans' }}
                  onChange = {this.setDate.bind(this)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{marginTop:"1em", marginBottom:'5em', fontFamily:'Open Sans' }}
                  className="submitCreate" >
                  Create Review
                </Button>
              </form> 
            </div>:
            null
            }
            
            {this.state.reviews.map((revObj: any, i: any) => <Grid key={i} item xs={12}>
              <Reviews revObj={revObj}  calculateTotalRating={this.calculateTotalRating} userId={this.props.userId} adminStatus={this.props.adminStatus} sessionToken={this.props.sessionToken} fetchReviews={this.getItemReviews}/></Grid> )}
          </Grid>      
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ItemDetailView);