import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import PersonIcon from '@material-ui/icons/Person';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography'

type ReviewsProps = {
  classes: any;
  revObj: any;
  key: number;
  calculateTotalRating: any;
}

type ReviewsState = {
  user: any;
  
}

const styles = (theme: any) => createStyles({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // overflow:'scroll',
  },
})

class Reviews extends React.Component<ReviewsProps, ReviewsState> {
  constructor (props: ReviewsProps) {
    super(props);
      this.state = {
        user: '',
      }
    }

  fetchUsers = () => {
    fetch(`http://localhost:8080/user/${this.props.revObj.userId}`, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ user: obj.user }))
  }

  getRating = () => {
    return this.props.calculateTotalRating(this.props.revObj.rating)
  }

  componentDidMount = () => {
    this.fetchUsers();
    this.getRating();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <Card className={classes.root} >
            <CardContent style={{ paddingTop:'1em'}}>
              <Typography variant="body2" color="textSecondary" component="p">
                <PersonIcon /> {this.state.user.firstName}
              </Typography>
            </CardContent>
            <Rating
              name="customized-empty"
              defaultValue={this.props.revObj.rating}
              precision={0.5}
              readOnly
              size="small"
              style={{paddingLeft:'0.7em'}}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <CardContent style={{ paddingTop:'0'}}>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.revObj.review}
              </Typography>
            </CardContent>
          </Card>
      </div>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(Reviews);