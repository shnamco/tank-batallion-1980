import { Action } from 'redux';

export enum AUTH_ACTIONS {
  LOG_IN = '[AUTH] LOG IN',
  LOG_IN_SUCCESS = '[AUTH] LOG IN SUCCESS',
  LOG_IN_FAILURE = '[AUTH] LOG IN FAILURE',
  SIGN_UP = '[AUTH] SIGN UP',
  SIGN_UP_SUCCESS = '[AUTH] SIGN UP SUCCESS',
  LOG_OUT = '[AUTH] LOG OUT',
  LOG_OUT_SUCCESS = '[AUTH] LOG OUT SUCCESS'
}

export const logInSuccess = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_SUCCESS };
};

export const logInFailure = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_FAILURE };
};

export type AuthActions = Action<AUTH_ACTIONS>;
