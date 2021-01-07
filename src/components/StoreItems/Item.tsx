import React from 'react';
import { Link} from 'react-router-dom'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import ItemDetailView from './ItemDetailView';

type ItemProps = {
  item: any;
  key: any;
  classes: any;
}

type ItemState = {
  itemName: string;
  storeItem: any[];
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
  },
})

class Item extends React.Component<ItemProps, ItemState> {
  state = {
    searchNodes: '',
    itemName: '',
    storeItem: []
  }

  handleClick = () => {
    // this.setState({
    //   itemName: this.props.item.itemName
    // })
    fetch(`http://localhost:8080/listing/${this.props.item.id}`, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ storeItem: obj.listing }))
 
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Link to={`/listing/${this.props.item.id}`} >
        <Card className={classes.root} >   
          <CardActionArea onClick={this.handleClick}>            
            <CardMedia
              className="media"
              // image={(this.props.item.imgURL)}
              image={require("./../../assets/" + this.props.item.imgURL + ".jpg").default}
              title="furniture"
              style={{height: 200, paddingTop: '56.25%'}}
            />
            <CardHeader
              title={this.props.item.itemName}
              subheader={"$" + this.props.item.price}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.item.color}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.item.description}
              </Typography>
            </CardContent>
            <Rating id="rating" name="size-small" defaultValue={5} size="small" readOnly/>
          </CardActionArea>
        </Card>
        </Link>
        {/* <ItemDetailView itemName={this.state.storeItem}/> */}
      </div>
    );
  }
}

{/* <ItemDetailView item={itemObj} key={i}/> */}
export default withStyles(styles, { withTheme: true })(Item);