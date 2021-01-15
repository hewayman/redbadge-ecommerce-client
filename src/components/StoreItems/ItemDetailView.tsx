import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Reviews from './../Reviews/Reviews'

type ItemProps = {
  // storeItems: any;
  // fetchStoreItems: any;
  storeItemId: number;
  classes: any;
}

type ItemState = {
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: string
  reviews: any[];
}

const styles = (theme: any) => createStyles({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
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
      reviews: []
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
          imgURL: obj.listing.imgURL,
          // reviews: obj.listing.reviews
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

  componentDidMount = () => {
    this.getItemDetails();
    this.getItemReviews();
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg" style={{ marginTop:"6em", marginBottom:'4em' }}>
        <Link to="/">
          <ArrowBackIosIcon /> Back
        </Link>

        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            // image={require('./../../assets/' + `${this.state.imgURL}.jpg`).default}
            title="Listing img"
            style={{height: 200, paddingTop: '56.25%'}}
          />
        </Card>
       
        <div style={{ marginTop:"6em", marginBottom:'4em' }}>
        {/* {console.log(this.state.itemName)} */}
        <p>{this.state.itemName}</p>
        <p>{this.state.color}</p>
        <p>{this.state.description}</p>
        <p>{this.state.price}</p>
        <p>{this.state.itemNum}</p>
        <p>{this.state.imgURL}</p>
      </div>
          <Grid container spacing={2} alignItems="center">
          
              {this.state.reviews.map((revObj: any, i: any) => <Grid item xs={12} sm={6} md={4}>
                <Reviews revObj={revObj} key={i} /></Grid> )}
          </Grid>      
        </Container>
    
    );
  }
}

export default withStyles(styles, { withTheme: true })(ItemDetailView);