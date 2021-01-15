import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button'
import { Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Reviews from './../Reviews/Reviews'

type ItemProps = {
  sessionToken: any;
  storeItemId: number;
  classes: any;
}

type ItemState = {
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: any;
  reviews: any[];
  imgPath: string;
  totalRating: number;
  count: number;
  avgRating: number;
}

const styles = (theme: any) => createStyles({
  root: {
    display: 'flex',
    // display: 'inline-block'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    // width: 151,
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
      avgRating: 0
    } 
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
  }

  getItemReviews = () => {
    fetch(`http://localhost:8080/review/item/${this.props.storeItemId}`, {
      method: 'GET'
    }).then(r => r.json())
      .then(obj => {
        this.setState({ 
          reviews: obj
        })
        console.log(obj)
    })
  }

  calculateTotalRating = (rating: any) => {
    this.setState(prevState => {
      return {
        avgRating: (prevState.totalRating + rating) / (prevState.count + 1)
      }
    })
  }
  
  toUpperCase = (str: string) => {
    return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
  }

  componentDidMount = () => {
    this.getItemDetails();
    this.getItemReviews();
  }
  
  render() {
    const { classes } = this.props;
    {console.log('totalrating', this.state.totalRating, 'count', this.state.count, 'avgRating', this.state.avgRating)}
    return (
      <div>
        <Container maxWidth="md" style={{ marginTop:'6em', marginBottom:'0' }}>
          <Link to="/">
            <ArrowBackIosIcon /> Back
          </Link>

          <Card className={classes.root} style={{ marginTop:'2em' }}>
            {this.state.imgURL ? 
              <CardMedia
                className={classes.cover}
                image={require(`../../assets/${this.state.imgURL}.jpg`).default}
                title="Listing img"
                style={{height: 200, width: '60%', paddingTop: '35%'}}
              />
            : null}
            <div className={classes.details} style={{width:'40%'}}>
              <CardContent className={classes.content} >
                <Typography component="h5" variant="h5">
                {/* if itemName is not null, format to upper case */}
                  {this.state.itemName ? this.toUpperCase(this.state.itemName) : this.state.itemName}
                </Typography>
                <Rating name="size-medium" value={this.state.avgRating} /> 
                <Typography variant="subtitle1" color="textSecondary">
                  ${this.state.price}
                  <br/>
                  {/* if color is not null, format to upper case */}
                  {this.state.color ? this.toUpperCase(this.state.color) : this.state.color}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <br/>
                  {this.state.description}
                  <br/>
                  <br/>
                  Item: {this.state.itemNum}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Container>
        <Container maxWidth="sm" style={{ marginTop:"6em", marginBottom:'4em' }}>
          <Grid container spacing={2} alignItems="center" style={{justifyContent: 'center'}}>
            {!this.props.sessionToken ? 
              <Button variant="outlined" disabled style={{width:'98%', marginBottom:'1em'}}>
                Sign-in to Leave Review
              </Button> :
              <Button variant="outlined" style={{width:'98%', marginBottom:'1em'}}>
                Write A Review
                </Button>}
            {this.state.reviews.map((revObj: any, i: any) => <Grid item xs={12}>
              <Reviews revObj={revObj} key={i} calculateTotalRating={this.calculateTotalRating}/></Grid> )}
          </Grid>      
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ItemDetailView);