import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import APIURL from '../../helpers/environment';

type ReviewsProps = {
  classes: any;
  revObj: any;
  calculateTotalRating: any;
  userId: string;
  adminStatus: boolean;
  sessionToken: string;
  fetchReviews: any;
}

type ReviewsState = {
  user: any;
  active: boolean;
  rating: number;
  review: string;
  date: string;
  errorStatus: boolean;
}

const styles = (theme: any) => createStyles({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    fontFamily: 'Open Sans'
  },
})

class Reviews extends React.Component<ReviewsProps, ReviewsState> {
  constructor (props: ReviewsProps) {
    super(props);
      this.state = {
        user: '',
        active: false,
        rating: 0,
        review: '',
        date: '',
        errorStatus: false
      }
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

  fetchUsers = () => {
    fetch(`${APIURL}/user/${this.props.revObj.userId}`, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(obj => this.setState({ user: obj.user }))
  }

  deleteReview = () => {
    fetch(`${APIURL}/review/${this.props.revObj.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    }) 
    .then(() => this.props.fetchReviews())
    .catch(err => console.log(err))
  }

  // edit review
  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `${APIURL}/review/${this.props.revObj.id}`;
    const body = {
      rating: this.state.rating || this.props.revObj.rating,
      review: this.state.review || this.props.revObj.review,
      date: this.state.date || this.props.revObj.date
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
        this.props.fetchReviews()
        this.setState({ active: false }) // turn toggle off after editing item
      })
      .catch(err => {console.log(err); this.setState({errorStatus: true})})
  }

  toggle = () => {
    const showEdit = this.state.active
    this.setState({active: !showEdit})
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
          <Card className={classes.root} style={{borderRadius:'0px', border:'none'}}>
          {/* if user created the review or is an admin, show the delete button */}
            {this.props.userId === this.props.revObj.userId || this.props.adminStatus ? 
              <IconButton className="deleteButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} 
              onClick={e => window.confirm("Are you sure you wish to delete this item?") && this.deleteReview()}>
                <DeleteIcon style={{height:'25px', width:'25px'}}/>
              </IconButton> 
              : 
              null
            }
          {/* if user created the review or is an admin, show the edit button */}
            {this.props.userId === this.props.revObj.userId || this.props.adminStatus ? 
              <IconButton className="createButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)',  float:'right', height:'30px', width:'30px'}} onClick={this.toggle}>
                <CreateIcon style={{height:'25px', width:'25px'}}/>
              </IconButton>
              :
              null
            }
          {/* display review edit form when create icon has been clicked, otherwise display review */}
            {this.state.active === false ? 
              <div>
                <CardContent style={{ paddingTop:'1em'}}>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily:'Open Sans' }}>
                    <PersonIcon /> {this.state.user.firstName ? this.state.user.firstName : 'unknown'}
                    <br/>
                    {this.props.revObj.date}
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
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily:'Open Sans' }}>
                    {this.props.revObj.review}
                  </Typography>
                </CardContent>
              </div>
              :
              <div className="paper" style={{marginTop:'0em'}}>
                <form onSubmit={this.handleSubmit} className="formEditReview" style={{ width: '70%', fontFamily:'Open Sans' }} noValidate>
                  <Rating
                    name="customized-empty"
                    defaultValue={this.props.revObj.rating}
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
                    defaultValue={this.props.revObj.review}
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
                    defaultValue={this.props.revObj.date}
                    onChange = {this.setDate.bind(this)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{marginTop:"1em", marginBottom:'5em', fontFamily:'Open Sans' }}
                    className="submitCreate" >
                    Edit Review
                  </Button>
                </form> 
              </div>
            }
          </Card>
      </div>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(Reviews);