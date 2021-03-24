import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './login_form.pcss';
import '@styles/variables.pcss';
import '@styles/login.pcss';
import { authApi, loginReq, reason } from '../../../../service/auth_api';
import { Input } from '@components/input/input';

type FormState = {
  error: string;
};

class Form extends Component<RouteComponentProps, FormState> {
  public state = {
    error: ''
  };

  componentDidMount(): void {
    authApi.getProfile().then((res) => {
      if (res.status === 200) {
        this.props.history.push('game');
      }
    });
  }

  public formSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const requestData: Record<string, string> = {
      login: '',
      password: ''
    };

    Object.keys(requestData).forEach((key) => {
      requestData[key] = formData.get(key) as string;
    });

    authApi.login(requestData as loginReq).then((res) => {
      if (res.status === 200) {
        this.props.history.push('game');
      } else {
        this.setState({
          error: (res.response as reason).reason
        });
      }
    });
  };

  public render(): React.ReactElement {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form" onSubmit={this.formSubmit}>
          <div className="login__form-block">
            <Input name="login" placeholder="Login" />
            <Input name="password" type="password" placeholder="Password" error={this.state.error} />
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

export const LoginForm = withRouter(Form);
