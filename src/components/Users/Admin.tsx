import React from 'react';
import { Link} from 'react-router-dom'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

type AdminProps = {
  sessionToken: any;
  classes: any;
}

type AdminState = {
  // email: string;
  // password: string;
  // isAdmin: boolean;
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

class Admin extends React.Component <AdminProps, AdminState> {
  constructor (props: AdminProps) {
    super(props);
    this.state = {
      // email: '',
      // password: '',
      // isAdmin: false,
    }
  }

  createAdmin = () => {
    const url = 'http://localhost:8080/user/admin';
    const body = {
      // email: this.state.email,
      // password: this.state.password,
      // isAdmin: this.state.isAdmin
    }
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': this.props.sessionToken
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => {
        // this.props.sessionToken(rObj.sessionToken)
        console.log(rObj)
      })
  }

  componentDidMount() {
    this.createAdmin()
  }

  render() {
    const { classes } = this.props;
    return (
      <div >
        <Container maxWidth="lg" style={{ marginTop:"4.8em", marginBottom:'4em'}}>
          {console.log("Admin loaded")}
          <h2>Admin Portal</h2>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.root} >   
                <Link to={`/listing/create`} style={{textDecoration:"none"}} >
                  <CardActionArea> 
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {"Create Listing"}
                    </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.root} >   
                <Link to={`/user/all`} style={{textDecoration:"none"}} >
                  <CardActionArea> 
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {"View All Customers"}
                    </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Admin);;