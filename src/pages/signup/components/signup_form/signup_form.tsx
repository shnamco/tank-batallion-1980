import React, { Component } from 'react';
import './signup_form.pcss';
import { Link } from 'react-router-dom';
import { Input } from '../../../../components/input/input';
import { yandxApi } from '../../../../service/api';
import { signUpReq } from '../../../../dataTypes';

export class SignupForm extends Component {
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

    console.log(requestData);

    yandxApi.signUp(requestData as signUpReq).then((res) => {
      console.log(res);
    });
  };

  public render(): React.ReactElement {
    return (
      <main className="login">
        <h1 className="login__title">LOG IN TO PLAY</h1>
        <form className="login__form" onSubmit={this.formSubmit}>
          <div className="login__form-block">
            <Input name="first_name" placeholder="FIRST NAME" />
            <Input name="second_name" placeholder="SECOND NAME" />
            <Input name="email" type="email" placeholder="EMAIL" />
            <Input name="login" placeholder="LOGIN" />
            <Input name="password" type="password" placeholder="Password" />
            <Input name="phone" type="phone" placeholder="PHONE" />
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
