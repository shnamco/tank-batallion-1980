import { Action } from 'redux';

export enum AUTH_ACTIONS {
  LOG_IN_SUCCESS = '[AUTH] LOG IN SUCCESS',
  LOG_IN_FAILURE = '[AUTH] LOG IN FAILURE',
  SIGN_UP_SUCCESS = '[AUTH] SIGN UP SUCCESS',
  LOG_OUT_SUCCESS = '[AUTH] LOG OUT SUCCESS'
}

export const logInSuccessAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_SUCCESS };
};

export const logInFailureAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_IN_FAILURE };
};

export const logOutAction = (): Action<AUTH_ACTIONS> => {
  return { type: AUTH_ACTIONS.LOG_OUT_SUCCESS };
};

export type AuthActions = Action<AUTH_ACTIONS>;
