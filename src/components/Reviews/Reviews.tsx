import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import PersonIcon from '@material-ui/icons/Person';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography'

type ReviewsProps = {
  classes: any;
  // showState: boolean;
  // reviewItem: any;
  revObj: any;
  key: number;
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
        user: ''
      }
    }

  fetchUsers = () => {
    fetch(`http://localhost:8080/user/${this.props.revObj.userId}`, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ user: obj.user }))
  }

  componentDidMount = () => {
    this.fetchUsers();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <div  className={classes.paper}> */}
          <Card className={classes.root} >
          {console.log("revObj", this.props.revObj.rating)}
            <CardContent style={{ paddingTop:'1em'}}>
              <Typography variant="body2" color="textSecondary" component="p">
                <PersonIcon /> {this.state.user.firstName}
              </Typography>
            </CardContent>
            {/* <Box component="fieldset" mb={3} borderColor="transparent"> */}
              <Rating
                name="customized-empty"
                defaultValue={this.props.revObj.rating}
                precision={0.5}
                readOnly
                size="small"
                style={{paddingLeft:'0.7em'}}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            {/* </Box> */}
            {/* <CardContent style={{ paddingTop:'0'}}>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.revObj.createdAt}
              </Typography>
            </CardContent> */}
            <CardContent style={{ paddingTop:'0'}}>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.revObj.review}
              </Typography>
            </CardContent>
          </Card>
        {/* </div> */}
      </div>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(Reviews);