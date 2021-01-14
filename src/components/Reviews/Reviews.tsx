import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

type ReviewsProps = {
  classes: any;
  showState: boolean;
  reviewItem: any;
}

type ReviewsState = {
  
}

const styles = (theme: any) => createStyles({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
})

class Reviews extends React.Component<ReviewsProps, ReviewsState> {
  constructor (props: ReviewsProps) {
    super(props);
      this.state = {
        // showState: true
      }
    }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div  className={classes.paper}>
          <h2 id="simple-modal-title">{this.props.reviewItem}</h2>
          <p id="simple-modal-description">
          {this.props.reviewItem}
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          {/* <SimpleModal /> */}
        </div>
      </div>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(Reviews);