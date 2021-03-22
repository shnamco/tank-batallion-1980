import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './login_form.pcss';
import { Input } from '../../../../components/input/input';
import { yandxApi } from '../../../../service/api';
import { loginReq } from '../../../../dataTypes';

class Form extends Component<RouteComponentProps> {
  componentDidMount(): void {
    yandxApi.getProfile().then((res) => {
      console.log(res); // if (isLogin) => {reason: "Cookie is not valid"}
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

    yandxApi.login(requestData as loginReq).then((res) => {
      console.log(res);
      if (res === 'OK' || res.reason === 'user already in system') {
        this.props.history.push('game');
      }
    });
  };

  public render(): React.ReactElement {
    console.log(this.props);
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form" onSubmit={this.formSubmit}>
          <div className="login__form-block">
            <Input name="login" placeholder="Login" />
            <Input name="password" type="password" placeholder="Password" />
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

const LoginForm = withRouter(Form);

export { LoginForm };
