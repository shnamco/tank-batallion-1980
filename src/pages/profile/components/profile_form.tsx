import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/input/input';
import './profile_form.pcss';
import '@styles/variables.pcss';
import '@styles/profile.pcss';
import { ROUTE } from '../../../utils/route';
import { authApi, Profile } from '@service/auth_api';

export class ProfileForm extends Component {
  public mainMenu = ROUTE.MENU;

  state = {
    profile: {
      id: null,
      first_name: null,
      second_name: null,
      display_name: null,
      avatar: null,
      email: '',
      login: '',
      phone: ''
    }
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

  formHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const requestData: Record<string, string> = {
      first_name: null,
      second_name: null,
      display_name: null
    };

    Object.keys(requestData).forEach((key) => {
      requestData[key] = formData.get(key) as string;
    });

    authApi.signUp(requestData as SignUpReq).then((res) => {
      if (res.status === 200 || (res.response as Reason).reason === 'User already in system') {
        this.authService.auth = true;
        this.props.history.push(ROUTE.MENU);
      } else {
        const reason = (res.response as Reason).reason;

        this.setState(this.getErrorState(reason));
      }
    });
  };

  public render(): React.ReactElement {
    const { first_name, second_name, display_name, email, login, phone } = this.state.profile;

    return (
      <main className="profile">
        <form className="profile__form" onSubmit={this.formHandler}>
          <div className="profile__form-fields">
            <Input placeholder="FIRST NAME" value={first_name ?? ''} />
            <Input placeholder="SECOND NAME" value={second_name ?? ''} />
            <Input placeholder="DISPLAY NAME" value={display_name ?? ''} />
            <Input disabled type="email" placeholder="EMAIL" value={email} />
            <Input disabled placeholder="LOGIN" value={login} />
            <Input disabled type="phone" placeholder="PHONE" value={phone} />
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
