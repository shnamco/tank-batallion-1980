import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/input/input';
import './signup_form.pcss';
import '@styles/login.pcss';

export class SignupForm extends Component {
  public state = {
    activeInput: 'first-name'
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
        <form className="login__form">
          <div className="login__form-block">
            <Input placeholder="FIRST NAME" />
            <Input placeholder="MUST BE PRESENT" />
            <Input type="email" placeholder="EMAIL" />
            <Input placeholder="LOGIN" />
            <Input type="password" placeholder="Password" />
            <Input type="phone" placeholder="PHONE" />
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
