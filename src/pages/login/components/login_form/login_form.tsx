import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/input/input';
import './login_form.pcss';
import '@styles/variables.pcss';
import '@styles/login.pcss';

export class LoginForm extends Component {
  public login = createRef<HTMLDivElement>();

  public render(): React.ReactElement {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form">
          <div className="login__form-block">
            <Input placeholder="Login" />
            <Input type="password" placeholder="Password" />
          </div>
          <div className="login__form-block">
            <button className="login__button">LOG IN</button>
            <Link to="signup" className="login__link">
              SIGN UP
            </Link>
          </div>
        </form>
      </main>
    );
  }
}
