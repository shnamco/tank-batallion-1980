import React, { Component } from 'react';
import './Form.pcss';

class Login extends Component {
  state = {};

  render() {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form">
          <div className="login__form-block">
            <div className="login__form-control">
              <input type="text" placeholder="Login" />
              <div className="dash-line">
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
              </div>
            </div>
            <div className="login__form-control">
              <input type="password" placeholder="Password" />
              <div className="dash-line">
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
                <div className="low-dash" />
              </div>
            </div>
          </div>
          <div className="login__form-block">
            <button className="login__button">LOG IN</button>
            <a href="/" className="login__link">
              SIGN UP
            </a>
          </div>
        </form>
      </main>
    );
  }
}

export default Login;
