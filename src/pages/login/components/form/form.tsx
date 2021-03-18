import React, { Component, createRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './form.pcss';

export class Form extends Component {
  public state = {
    activeInput: 'login'
  };

  public login = createRef<HTMLDivElement>();

  public password = createRef<HTMLDivElement>();

  public activeInputHandler = (e: MouseEvent, input: HTMLDivElement | null): void => {
    const control = (e.target as HTMLElement).closest('.login__form-control');

    input?.classList.remove('active');

    control?.classList.add('active');
  };

  public render(): JSX.Element {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form">
          <div className="login__form-block">
            <div className="login__form-control" ref={this.login} onClick={(e) => this.activeInputHandler(e, this.password.current)}>
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
            <div className="login__form-control" ref={this.password} onClick={(e) => this.activeInputHandler(e, this.login.current)}>
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
            <Link to="signup" className="login__link">
              SIGN UP
            </Link>
          </div>
        </form>
      </main>
    );
  }
}
