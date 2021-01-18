import React, { Component } from 'react';

class SignIn extends Component {

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm = _ => {
    return this.state.email.length > 0 && this.state.password.length > 8;
  }

  render() {
    return (
      <div className="container">
        <form action="http://localhost:5000/signin" className="white" method="post">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0" disabled={!this.validateForm} type="submit">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
