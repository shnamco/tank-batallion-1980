import { Action } from 'redux';

export enum AUTH_ACTIONS {
  LOG_IN = '[AUTH] LOG IN',
  LOG_IN_SUCCESS = '[AUTH] LOG IN SUCCESS',
  LOG_IN_FAILURE = '[AUTH] LOG IN FAILURE',
  LOG_IN_REDIRECT = '[AUTH] LOG IN REDIRECT',
  SIGN_UP = '[AUTH] SIGN UP',
  LOG_OUT = '[AUTH] LOG OUT',
  GET_PROFILE = '[AUTH] GET PROFILE'
}

interface LogInAction extends Action<AUTH_ACTIONS.LOG_IN> {
  payload: { password: string; username: string };
}

export const logInAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN };
};

export const logInSuccessAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_SUCCESS };
};

export const logInFailureAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_FAILURE };
};

export const logInRedirectAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_REDIRECT };
};

export const getProfileAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.GET_PROFILE };
};

export const signUpAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.SIGN_UP };
};

export const logOutAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_OUT };
};

export type AuthActions = LogInAction | Action<AUTH_ACTIONS>;
