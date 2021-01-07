import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

type UserProps = {
  user: any;
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
})

class User extends React.Component<UserProps> {
  state = {
    searchNodes: '',
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.root} >   
          <CardActionArea>            
            {/* <CardMedia
              className="media"
  
              image={require("./../../assets/" + this.props.item.imgURL + ".jpg").default}
              title="furniture"
              style={{height: 200, paddingTop: '56.25%'}}
            /> */}
            <CardHeader
              title={this.props.user.firstName  + ' ' + this.props.user.lastName}
              subheader={String(this.props.user.isAdmin)}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.user.email}
                <br/>
                {this.props.user.phone}
                <br/>
                {this.props.user.addressLn1}
                <br/>
                {this.props.user.addressLn2}
                <br/>
                {this.props.user.city}
                <br/>
                {this.props.user.state}
                <br/>
                {this.props.user.zipcode}
              </Typography>
            </CardContent>
            {/* <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.user.addressLn1}
              </Typography>
            </CardContent> */}
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(User);