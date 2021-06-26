import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@components/input/input';
import './profile_form.pcss';
import '@styles/variables.pcss';
import '@styles/profile.pcss';
import { ROUTE } from '../../../interfaces/route';
import { Profile, RequestData } from '@services/profile_api';
import { connect } from 'react-redux';
import { RootState } from '@store/core/store';
import { ThunkDispatch } from 'redux-thunk';
import { changeProfile, requestProfile } from '@store/profile/profile.thunks';
import { ProfileAction } from '@store/profile/profile.actions';
import { selectProfile, selectProfileError } from '@store/profile/profile.selectors';
import { THEME } from '@store/auth/auth.reducer';
import { selectTheme } from '@store/auth/auth.selectors';
import { changeUserTheme } from '@store/auth/auth.thunks';

type FormProps = {
  profile: Profile;
  error: null | string;
  theme: THEME;
  requestProfile: () => void;
  changeProfile: (requestData: RequestData) => void;
  changeUserTheme: (id: number) => void;
};

interface FormState {
  isFullscreen: boolean;
  isPlaying: boolean;
}

class Form extends Component<FormProps, FormState> {
  public mainMenu = ROUTE.MENU;
  public audio = new Audio('https://docs.google.com/uc?export=download&id=1To1ASaIsiFjEUfBiwXDmgl2hkjXF6kr7');

  constructor(props: FormProps) {
    super(props);
    this.state = { isFullscreen: false, isPlaying: false };
  }

  public componentDidMount(): void {
    this.props.requestProfile();
  }

  formHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const requestData: RequestData = {
      first_name: null,
      second_name: null,
      display_name: null,
      email: null,
      login: null,
      phone: null
    };

    Object.keys(requestData).forEach((key) => {
      requestData[key as keyof RequestData] = formData.get(key) as string;
    });

    this.props.changeProfile(requestData);
  };

  public themeClicked(): void {
    const theme = THEME.DARK === this.props.theme ? THEME.LIGHT : THEME.DARK;

    this.props.changeUserTheme(theme);
  }

  public get theme(): string {
    if (THEME.DARK === this.props.theme) {
      return 'LIGHT';
    }
    return 'DARK';
  }

  public fullscreenClicked(): void {
    if (document.fullscreenElement) {
      this.setState({ isFullscreen: false });
      document.exitFullscreen();
    } else {
      this.setState({ isFullscreen: true });
      document.getElementById('root')?.requestFullscreen();
    }
  }

  public soundClicked(): void {
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      this.state.isPlaying ? this.audio.play() : this.audio.pause();
    });
  }

  public get soundTitle(): string {
    return this.state.isPlaying ? 'SOUND OFF' : 'SOUND ON';
  }

  public get fullscreenTitle(): string {
    return this.state.isFullscreen ? 'LEAVE FULLSCREEN' : 'ENTER FULLSCREEN';
  }

  public render(): React.ReactElement {
    const { first_name, second_name, display_name, email, login, phone } = this.props.profile;

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
            {<span className="profile__form-error">{this.props.error && this.props.error}</span>}
          </div>
          <div className="profile__form-actions">
            <button type="submit" className="profile__button">
              UPDATE PROFILE
            </button>
            <button type="button" onClick={this.themeClicked.bind(this)} className="profile__switch">
              SWITCH TO {this.theme}
            </button>
            <button type="button" onClick={this.fullscreenClicked.bind(this)} className="profile__switch">
              {this.fullscreenTitle}
            </button>
            <button type="button" onClick={this.soundClicked.bind(this)} className="profile__switch">
              {this.soundTitle}
            </button>
            <Link to={this.mainMenu} className="profile__link">
              BACK TO THE MAIN MENU
            </Link>
          </div>
        </form>
      </main>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    profile: selectProfile(state),
    error: selectProfileError(state),
    theme: selectTheme(state)
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<RootState, void, ProfileAction>) {
  return {
    requestProfile: () => dispatch(requestProfile()),
    changeProfile: (requestData: RequestData) => dispatch(changeProfile(requestData)),
    changeUserTheme: (id: number) => dispatch(changeUserTheme(id))
  };
}

export const ProfileForm = connect(mapStateToProps, mapDispatchToProps)(Form);
