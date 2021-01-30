import React from 'react';
import NotFound from '../Site/NotFound';
import APIURL from '../../helpers/environment';

class AdminCreate extends React.Component {

  // automatically creates a super admin account based on the email/password in the .env file
  createAdmin = () => {
    const url = `${APIURL}/user/admin`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(r => r.json())
      .then(rObj => {
        console.log(rObj)
      })
  }

  componentDidMount() {
    this.createAdmin()
  }

  render() {
    return (
      // displays a page not found message when the user hits this /create/admin endpoint
      // and automatically creates a super admin account
      <NotFound />
    );
  }
}

export default AdminCreate;