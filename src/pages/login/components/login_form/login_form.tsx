import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './login_form.pcss';
import '@styles/variables.pcss';
import '@styles/login.pcss';
import { LoginReq, Reason } from '@service/auth_api';
import { Input } from '@components/input/input';
import { logIn } from '@store/auth/auth.thunks';
import { connect, ConnectedProps } from 'react-redux';
import { HistoryProxy } from '@utils/history';

type FormState = {
  error: string;
};

interface FormProps extends RouteComponentProps {
  logIn: (data: LoginReq, onError: (response: string | Reason) => void, history: HistoryProxy) => unknown;
}

const connector = connect(null, { logIn });

type PropsFromRedux = ConnectedProps<typeof connector>;

class Form extends Component<FormProps & PropsFromRedux, FormState> {
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

    this.props.logIn(requestData as LoginReq, this.onError.bind(this), this.props.history);
  };

  private onError(res: string | Reason): void {
    this.setState({
      error: (res as Reason).reason
    });
  }

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

export const LoginForm = withRouter(connector(Form));
