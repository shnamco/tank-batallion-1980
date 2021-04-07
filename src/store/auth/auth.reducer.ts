import { AUTH_ACTIONS, AuthActions } from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true
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
    default:
      return state;
  }
};
