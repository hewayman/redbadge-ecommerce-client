import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link} from 'react-router-dom';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import User from './User'

type UserProps = {
  users: any;
  fetchUsers: any;
  sessionToken: any;
  token: any;
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
        <Container maxWidth="lg" style={{ marginTop:"6em", marginBottom:'4em' }}>
          <Link to="/user/admin">
            <ArrowBackIosIcon /> Back
          </Link>
          <Grid container spacing={2} alignItems="center">
              {this.props.users.map((userObj: any, i: any) => <Grid item xs={12} sm={6}>
                <User user={userObj} key={i}users={this.props.users} fetchUsers={this.props.fetchUsers} sessionToken={this.props.token}/>
                </Grid> )}
          </Grid>      
        </Container>
      </div>
    )
  }
}