import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import User from './User'

type UserProps = {
  users: any;
  fetchUsers: any;
  sessionToken: string;
  token: string;
}

export default class UserList extends React.Component<UserProps> {

  constructor (props: UserProps) {
    super(props);
    this.state = {
    } 
  }

  render() {
    return (
      <div>
        <Container component="main" maxWidth="lg">
          <Link to="/admin" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon className="backArrow" /> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </Link>
          <div className="paper" style={{marginTop:'30px'}}>
            <Avatar className="avatar" style={{backgroundColor:'#f50057', display:'inline'}}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ fontFamily:'Montserrat', fontWeight:900, display:'inline' }}>
              Edit Customers
            </Typography>
            <Grid container spacing={2} alignItems="center" style={{ paddingTop:'2em' }}>
                {this.props.users.map((userObj: any, i: any) => <Grid container item xs={12} sm={6} md={4}>
                  <User user={userObj} key={i}users={this.props.users} fetchUsers={this.props.fetchUsers} sessionToken={this.props.token}/>
                  </Grid> )}
            </Grid>   
          </div>  
        </Container>
      </div>
    )
  }
}