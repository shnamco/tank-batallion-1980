import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/input/input';
import './profile_form.pcss';
import '@styles/variables.pcss';
import '@styles/profile.pcss';
import { ROUTE } from '../../../utils/route';

export class ProfileForm extends Component {
  public mainMenu = ROUTE.MENU;

  public render(): React.ReactElement {
    return (
      <main className="profile">
        <form className="profile__form">
          <div className="profile__form-fields">
            <Input disabled placeholder="FIRST NAME" />
            <Input disabled placeholder="MUST BE PRESENT" />
            <Input disabled type="email" placeholder="EMAIL" />
            <Input disabled placeholder="LOGIN" />
            <Input disabled type="password" placeholder="Password" />
            <Input disabled type="phone" placeholder="PHONE" />
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
