import React , { Component } from 'react';
import SignIn from '../auth/SignIn';

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard container">
        <div className="col align-self-cente">
          <div className="col s12 m3 ">
            <SignIn/>
          </div>
        </div>
      </div>
    );
  }
}



export default Dashboard;
