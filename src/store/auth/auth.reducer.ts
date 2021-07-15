import { AUTH_ACTIONS, AuthActions } from './auth.actions';
import { Profile } from '@services/profile_api';

export enum THEME {
  DARK = 1,
  LIGHT = 2
}

export interface AuthState {
  profile: Profile | null;
  isLoggedIn: boolean;
  userTheme: THEME;
}

export const initialState: AuthState = {
  profile: null,
  isLoggedIn: true,
  userTheme: THEME.DARK
};

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOG_IN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case AUTH_ACTIONS.LOG_IN_FAILURE:
    case AUTH_ACTIONS.LOG_IN_REDIRECT: {
      return { ...state, isLoggedIn: false };
    }
    case AUTH_ACTIONS.GET_THEME_SUCCESS: {
      return { ...state, userTheme: action.payload.theme };
    }
    case AUTH_ACTIONS.GET_PROFILE_SUCCESS: {
      return { ...state, profile: action.payload.profile };
    }
    default:
      return state;
  }
};
