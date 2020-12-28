import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

type ItemProps = {
  item: any;
  key: any;
  classes: any;
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
  // expand: {
  //   transform: 'rotate(0deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
  // avatar: {
  //   backgroundColor: red[500],
  // },

})

// interface Props extends WithStyles<typeof styles>{ }

class Item extends React.Component<ItemProps> {
  state = {
    searchNodes: '',
  }

  

  render() {
    console.log(this.props.item.imgURL)
    const { classes } = this.props;
    // const image = require('./../../assets/img1.jpg');
    return (
      <div className={classes.root}>
        <Card className={classes.root} >   
          <CardActionArea>            
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
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Item);