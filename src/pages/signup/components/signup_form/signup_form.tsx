import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './signup_form.pcss';
import '@styles/login.pcss';
import { authApi, signUpReq, reason } from '../../../../service/auth_api';
import { Input } from '@components/input/input';

type formState = {
  loginError: string;
  emailError: string;
  phoneError: string;
};

class Form extends Component<RouteComponentProps, formState> {
  public state = {
    loginError: '',
    emailError: '',
    phoneError: ''
  };

  public formSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const requestData: Record<string, string> = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: ''
    };

    Object.keys(requestData).forEach((key) => {
      requestData[key] = formData.get(key) as string;
    });

    authApi.signUp(requestData as signUpReq).then((res) => {
      if (res.status === 200) {
        this.props.history.push('game');
      }

      if (res.status === 409) {
        const reason = (res.response as reason).reason;

        if (reason === 'Login already exists') {
          this.setState({
            loginError: reason,
            phoneError: '',
            emailError: ''
          });
        }

        if (reason === 'Email already exists') {
          this.setState({
            emailError: reason,
            loginError: '',
            phoneError: ''
          });
        }
      }

      if (res.status === 400) {
        const reason = (res.response as reason).reason;

        if (reason === 'email is not valid') {
          this.setState({
            emailError: reason,
            loginError: '',
            phoneError: ''
          });
        }

        if (reason === 'phone is not valid') {
          this.setState({
            phoneError: reason,
            emailError: '',
            loginError: ''
          });
        }
      }
    });
  };

  public render(): React.ReactElement {
    const { emailError, loginError, phoneError } = this.state;

    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form" onSubmit={this.formSubmit}>
          <div className="login__form-block">
            <Input name="first_name" placeholder="FIRST NAME" />
            <Input name="second_name" placeholder="SECOND NAME" />
            <Input name="email" type="email" placeholder="EMAIL" error={emailError} />
            <Input name="login" placeholder="LOGIN" error={loginError} />
            <Input name="password" type="password" placeholder="Password" />
            <Input name="phone" type="phone" placeholder="PHONE" error={phoneError} />
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

export const SignupForm = withRouter(Form);
