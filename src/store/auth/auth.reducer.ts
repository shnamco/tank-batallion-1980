import { AUTH_ACTIONS, AuthActions } from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false
};

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOG_IN: {
      return { ...state, isLoading: true };
    }
    case AUTH_ACTIONS.LOG_IN_SUCCESS: {
      return { ...state, isLoggedIn: true, isLoading: false };
    }
    default:
      return state;
  }
};
