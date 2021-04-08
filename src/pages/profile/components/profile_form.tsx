import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/input/input';
import './profile_form.pcss';
import '@styles/variables.pcss';
import '@styles/profile.pcss';
import { ROUTE } from '../../../utils/route';
import { authApi } from '@service/auth_api';
import { profileApi, RequestData, Profile, Error } from '@service/profile_api';

export class ProfileForm extends Component {
  public mainMenu = ROUTE.MENU;

  state = {
    profile: {
      id: null,
      first_name: null,
      second_name: null,
      display_name: null,
      avatar: null,
      email: null,
      login: null,
      phone: null
    },
    error: null
  };

  public componentDidMount(): void {
    authApi.getProfile().then((res) => {
      if (res.status === 200) {
        this.setProfile(res.response as Profile);
      }
    });
  }

  public setProfile = (profile: Profile): void => {
    this.setState({
      profile
    });
  };

  formHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const requestData: RequestData = {
      first_name: null,
      second_name: null,
      display_name: null,
      email: this.state.profile.email,
      login: this.state.profile.login,
      phone: this.state.profile.phone
    };

    Object.keys(requestData).forEach((key) => {
      requestData[key as keyof RequestData] = formData.get(key) as string;
    });

    const res = await profileApi.changeProfile(requestData);

    if (res.status === 200) {
      this.setState({
        profile: res.response,
        error: null
      });
    } else {
      console.log(res);
      this.setState({
        error: (res.response as Error).reason
      });
    }
  };

  public render(): React.ReactElement {
    const { first_name, second_name, display_name, email, login, phone } = this.state.profile;

    return (
      <main className="profile">
        <form className="profile__form" onSubmit={this.formHandler}>
          <div className="profile__form-fields">
            <Input name="first_name" placeholder="FIRST NAME" value={first_name ?? ''} />
            <Input name="second_name" placeholder="SECOND NAME" value={second_name ?? ''} />
            <Input name="display_name" placeholder="DISPLAY NAME" value={display_name ?? ''} />
            <Input name="email" type="email" placeholder="EMAIL" value={email ?? ''} />
            <Input name="login" placeholder="LOGIN" value={login ?? ''} />
            <Input name="phone" type="phone" placeholder="PHONE" value={phone ?? ''} />
            {<span className="profile__form-error">{this.state.error && this.state.error}</span>}
          </div>
          <div className="profile__form-actions">
            <button className="profile__button">UPDATE PROFILE</button>
            <Link to={this.mainMenu} className="profile__link">
              BACK TO THE MAIN MENU
            </Link>
          </div>
        </form>
      </main>
    );
  }
}
