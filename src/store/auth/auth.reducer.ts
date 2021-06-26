import { AUTH_ACTIONS, AuthActions } from './auth.actions';

export enum THEME {
  DARK = 1,
  LIGHT = 2
}

export interface AuthState {
  isLoggedIn: boolean;
  userTheme: THEME;
}

export const initialState: AuthState = {
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
    default:
      return state;
  }
};
