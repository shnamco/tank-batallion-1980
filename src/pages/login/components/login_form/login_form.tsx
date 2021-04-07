import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './login_form.pcss';
import '@styles/variables.pcss';
import '@styles/login.pcss';
import { LoginReq } from '@service/auth_api';
import { Input } from '@components/input/input';
import { logIn } from '@store/auth/auth.thunks';
import { store } from '@store/store';

type FormState = {
  error: string;
};

class Form extends Component<RouteComponentProps, FormState> {
  public state = {
    error: ''
  };

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

    store.dispatch(logIn(requestData as LoginReq, this.props.history));
    // authApi.login(requestData as LoginReq).then((res) => {
    //   if (res.status === 200 || (res.response as Reason).reason === 'User already in system') {
    //     this.authService.auth = true;
    //     this.props.history.push(ROUTE.MENU);
    //   } else {
    //     this.setState({
    //       error: (res.response as Reason).reason
    //     });
    //   }
    // });
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
