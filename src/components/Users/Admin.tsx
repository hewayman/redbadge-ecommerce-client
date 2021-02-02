import React from 'react';
import { Link} from 'react-router-dom'
import { withStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

type AdminProps = {
  sessionToken: string;
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

class Admin extends React.Component <AdminProps> {

  render() {
    const { classes } = this.props;
    return (
      <div >
        <Container component="main" maxWidth="lg" >
          <Link to="/" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon className="backArrow" /> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </Link>
          <Container maxWidth="md" style={{minHeight:'65vh', marginBottom:'80px', alignItems:'center'}} >
            <Grid container spacing={2} alignItems="center" justify='center'>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root} >   
                  <Link to={`/listing/create`} style={{textDecoration:"none"}} >
                    <CardActionArea> 
                      <CardContent>
                      <CardMedia
                        className="media"
                        image={`/assets/listing.svg`}
                        title="listingImg"
                        style={{height: 200, paddingTop: '56.25%'}}
                      />
                      <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily:'Montserrat', fontSize:'1.2em', fontWeight: 900, paddingTop:'20px'  }}>
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
                      <CardMedia
                        className="media"
                        image={`/assets/person.svg`}
                        title="furniture"
                        style={{height: 200, paddingTop: '56.25%'}}
                      />
                      <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily:'Montserrat', fontSize:'1.2em', fontWeight: 900, paddingTop:'20px' }}>
                        {"View All Customers"}
                      </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Admin);;