import React from 'react';
import Container from '@material-ui/core/Container'
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import User from './User'

type UserProps = {
  users: any;
  fetchUsers: any;
  sessionToken: any;
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
          <Grid container spacing={2} alignItems="center">
              {this.props.users.map((userObj: any, i: any) => <Grid item xs={12} sm={6} md={4}><User user={userObj} key={i}/></Grid> )}
          </Grid>      
        </Container>
      </div>
    )
  }
}