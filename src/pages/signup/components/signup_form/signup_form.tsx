import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './signup_form.pcss';
import '@styles/login.pcss';
import { Input } from '@components/input/input';
import { Reason, SignUpReq } from '@service/auth_api';
import { connect, ConnectedProps } from 'react-redux';
import { signUp } from '@store/auth/auth.thunks';
import { HistoryProxy } from '@utils/history';

type FormState = {
  loginError: string;
  emailError: string;
  phoneError: string;
};

interface FormProps extends RouteComponentProps {
  signUp: (data: SignUpReq, onError: (response: string | Reason) => void, history: HistoryProxy) => unknown;
}

const connector = connect(null, { signUp });

type PropsFromRedux = ConnectedProps<typeof connector>;

class Form extends Component<FormProps & PropsFromRedux, FormState> {
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

    this.props.signUp(requestData as SignUpReq, this.onError.bind(this), this.props.history);
  };

  private onError(res: string | Reason): void {
    const reason = (res as Reason).reason;

    this.setState(this.getErrorState(reason));
  }

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

export const SignupForm = withRouter(connector(Form));
