import React from 'react';
import { Link} from 'react-router-dom'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Reviews from './../Reviews/Reviews'
import ItemDetailView from './ItemDetailView';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

type ItemProps = {
  item: any;
  key: any;
  classes: any;
}

type ItemState = {
  itemName: string;
  storeItem: any;
  show: boolean;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function modalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme: any) => createStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    wrap: 'nowrap'
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
    // padding: theme.spacing(2, 4, 3),
  },
})

class Item extends React.Component<ItemProps, ItemState> {
  constructor (props: ItemProps) {
    super(props);
      this.state = {
        // searchNodes: '',
        itemName: '',
        storeItem: [],
        show: false
      }
      this.handleClick = this.handleClick.bind(this);
      this.showModal = this.showModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

  handleClick = () => {
    fetch(`http://localhost:8080/listing/${this.props.item.id}`, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => {
        this.setState({ storeItem: obj.listing })
        console.log(obj.listing)
      })
  }

  showModal = () => {
    this.setState({ show: true });
  }

  closeModal = () => {
    this.setState({ show: false });
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.root} >   
          <IconButton className="deleteButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} 
            onClick={e =>
                    window.confirm("Are you sure you wish to delete this item?")
            }>
            <DeleteIcon style={{height:'25px', width:'25px'}}/>
          </IconButton>
          <IconButton className="createButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} >
            <CreateIcon style={{height:'25px', width:'25px'}}/>
          </IconButton> 
          <Link to={`/listing/${this.props.item.id}`} style={{textDecoration:'none', color:'black'}}>
            <CardActionArea onClick={this.handleClick}>            
              <CardMedia
                className="media"
                image={require("./../../assets/" + this.props.item.imgURL + ".jpg").default}
                title="furniture"
                style={{height: 200, paddingTop: '56.25%'}}
              />
              <CardHeader
                title={this.toUpperCase(this.props.item.itemName)}
                style={{paddingBottom:'0'}}
              />
              <Rating id="rating" name="size-small" defaultValue={5} size="small" readOnly style={{paddingLeft:'0.7em', color:'black'}}/>
              <CardContent style={{paddingBottom:'0', paddingTop:'0'}}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {"$" + this.props.item.price}
                </Typography>
              </CardContent>
              <CardContent style={{paddingTop:'0'}}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.toUpperCase(this.props.item.color)}
                </Typography>
              </CardContent>
              <CardContent style={{ paddingTop:'0'}}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <Button size="small" color="secondary" onClick={this.showModal}>Reviews</Button>
          <Modal
            open={this.state.show}
            onClose={this.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', overflow:'scroll'}}
          >
            <Reviews showState={this.state.show} reviewItem={this.state.storeItem}/>
          </Modal>
        </Card>
        
      </div>
    );
  }
}

{/* <ItemDetailView item={itemObj} key={i}/> */}
export default withStyles(styles, { withTheme: true })(Item);