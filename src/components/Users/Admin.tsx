import React from 'react';

type AdminProps = {
  sessionToken: any;
}

type AdminState = {
  // email: string;
  // password: string;
  // isAdmin: boolean;
}

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
    return (
      <div>
        {console.log("Admin loaded")}
        <h2>Admin</h2>
      </div>
    );
  }
}

export default Admin;