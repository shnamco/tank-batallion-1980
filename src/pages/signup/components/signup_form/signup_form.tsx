import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './signup_form.pcss';
import '@styles/login.pcss';
import { authApi, SignUpReq, Reason } from '@service/auth_api';
import { Input } from '@components/input/input';
import { ROUTE } from '@models/route';

type FormState = {
  loginError: string;
  emailError: string;
  phoneError: string;
};

class Form extends Component<RouteComponentProps, FormState> {
  public state = {
    loginError: '',
    emailError: '',
    phoneError: ''
  };

  public getErrorState = (reason: string): FormState | null => {
    switch (reason) {
      case 'Login already exists':
        return {
          loginError: reason,
          phoneError: '',
          emailError: ''
        };
      case 'Email already exists':
        return {
          loginError: '',
          phoneError: '',
          emailError: reason
        };
      case 'email is not valid':
        return {
          loginError: '',
          phoneError: '',
          emailError: reason
        };
      case 'phone is not valid':
        return {
          loginError: '',
          phoneError: reason,
          emailError: ''
        };
      default:
        return null;
    }
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

    authApi.signUp(requestData as SignUpReq).then((res) => {
      if (res.status === 200) {
        this.props.history.push(ROUTE.MENU);
      } else {
        const reason = (res.response as Reason).reason;

        this.setState(this.getErrorState(reason));
      }
    });
  };

  public render(): React.ReactElement {
    const { emailError, loginError, phoneError } = this.state;

    return (
      <main className="login">
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
