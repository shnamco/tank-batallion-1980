import React, { Component, createRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './loginForm.pcss';
import Input from '../../../../components/input/input';

export default class LoginForm extends Component {
  public login = createRef<HTMLDivElement>();

  public password = createRef<HTMLDivElement>();

  public activeInputHandler = (e: MouseEvent, ref: HTMLDivElement | null): void => {
    const control = (e.target as HTMLElement).closest('.login__form-control');

    ref?.classList.remove('active');

    control?.classList.add('active');
  };

  public render(): React.ReactElement {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form">
          <div className="login__form-block">
            <div className="login__form-control active" ref={this.login} onClick={(e) => this.activeInputHandler(e, this.password.current)}>
              <Input placeholder="Login" />
            </div>
            <div className="login__form-control" ref={this.password} onClick={(e) => this.activeInputHandler(e, this.login.current)}>
              <Input type="password" placeholder="Password" />
            </div>
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
