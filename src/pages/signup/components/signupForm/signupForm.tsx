import React, { Component } from 'react';
import './signupForm.pcss';
import { Link } from 'react-router-dom';
import Input from '../../../../components/input/input';

class SignupForm extends Component {
  public state = {
    activeInput: ''
  };

  public activeInputHandler = (activeInput: string): void => {
    this.setState({ activeInput });
  };

  public createClassName = (str: string): boolean => {
    return str === this.state.activeInput;
  };

  public render(): React.ReactElement {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form">
          <div className="login__form-block">
            <div
              className={`login__form-control ${this.createClassName('first-name') ? 'active' : ''}`}
              onClick={() => this.activeInputHandler('first-name')}
            >
              <Input placeholder="FIRST NAME" />
            </div>
            <div
              className={`login__form-control ${this.createClassName('must-be') ? 'active' : ''}`}
              onClick={() => this.activeInputHandler('must-be')}
            >
              <Input placeholder="MUST BE PRESENT" />
            </div>
            <div
              className={`login__form-control ${this.createClassName('email') ? 'active' : ''}`}
              onClick={() => this.activeInputHandler('email')}
            >
              <Input type="email" placeholder="EMAIL" />
            </div>
            <div
              className={`login__form-control ${this.createClassName('login') ? 'active' : ''}`}
              onClick={() => this.activeInputHandler('login')}
            >
              <Input placeholder="LOGIN" />
            </div>
            <div
              className={`login__form-control ${this.createClassName('password') ? 'active' : ''}`}
              onClick={() => this.activeInputHandler('password')}
            >
              <Input type="password" placeholder="Password" />
            </div>
            <div
              className={`login__form-control ${this.createClassName('phone') ? 'active' : ''}`}
              onClick={() => this.activeInputHandler('phone')}
            >
              <Input type="phone" placeholder="PHONE" />
            </div>
          </div>
          <div className="login__form-block">
            <button className="login__button">SIGN UP</button>
            <Link to="login" className="login__link">
              I HAVE AN ACCOUNT
            </Link>
          </div>
        </form>
      </main>
    );
  }
}

export default SignupForm;
