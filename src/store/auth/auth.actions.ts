import { Action } from 'redux';

export enum AUTH_ACTIONS {
  LOG_IN = '[AUTH] LOG IN',
  LOG_IN_SUCCESS = '[AUTH] LOG IN SUCCESS',
  LOG_IN_FAILURE = '[AUTH] LOG IN FAILURE',
  LOG_IN_REDIRECT = '[AUTH] LOG IN REDIRECT',
  SIGN_UP = '[AUTH] SIGN UP',
  LOG_OUT = '[AUTH] LOG OUT',
  GET_PROFILE = '[AUTH] GET PROFILE',
  GET_THEME_SUCCESS = '[AUTH] GET THEME SUCCESS'
}

interface GetThemeAction extends Action<AUTH_ACTIONS.GET_THEME_SUCCESS> {
  payload: { theme: number };
}

export const logInAction = (): Action<AUTH_ACTIONS.LOG_IN> => {
  return { type: AUTH_ACTIONS.LOG_IN };
};

export const logInSuccessAction = (): Action<AUTH_ACTIONS.LOG_IN_SUCCESS> => {
  return { type: AUTH_ACTIONS.LOG_IN_SUCCESS };
};

export const logInFailureAction = (): Action<AUTH_ACTIONS.LOG_IN_FAILURE> => {
  return { type: AUTH_ACTIONS.LOG_IN_FAILURE };
};

export const logInRedirectAction = (): Action<AUTH_ACTIONS.LOG_IN_REDIRECT> => {
  return { type: AUTH_ACTIONS.LOG_IN_REDIRECT };
};

export const getProfileAction = (): Action<AUTH_ACTIONS.GET_PROFILE> => {
  return { type: AUTH_ACTIONS.GET_PROFILE };
};

export const signUpAction = (): Action<AUTH_ACTIONS.SIGN_UP> => {
  return { type: AUTH_ACTIONS.SIGN_UP };
};

export const logOutAction = (): Action<AUTH_ACTIONS.LOG_OUT> => {
  return { type: AUTH_ACTIONS.LOG_OUT };
};

export const getThemeSuccess = (theme: number): GetThemeAction => {
  return { type: AUTH_ACTIONS.GET_THEME_SUCCESS, payload: { theme } };
};

export type AuthActions =
  | GetThemeAction
  | Action<AUTH_ACTIONS.LOG_OUT>
  | Action<AUTH_ACTIONS.LOG_IN>
  | Action<AUTH_ACTIONS.LOG_IN_SUCCESS>
  | Action<AUTH_ACTIONS.LOG_IN_FAILURE>
  | Action<AUTH_ACTIONS.LOG_IN_REDIRECT>
  | Action<AUTH_ACTIONS.GET_PROFILE>
  | Action<AUTH_ACTIONS.SIGN_UP>;
