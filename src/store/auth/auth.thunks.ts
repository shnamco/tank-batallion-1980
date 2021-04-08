import {
  AuthActions,
  getProfileAction,
  logInAction,
  logInFailureAction,
  logInRedirectAction,
  logInSuccessAction,
  logOutAction
} from '@store/auth/auth.actions';
import { authApi, LoginReq, Reason } from '@service/auth_api';
import { Dispatch } from 'react';
import { ROUTE } from '@utils/route';

// eslint-disable-next-line
export const logIn = (data: LoginReq, history: any): any => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(logInAction());

    authApi
      .login(data)
      .then((res) => {
        if (res.status === 200 || (res.response as Reason).reason === 'User already in system') {
          dispatch(logInSuccessAction());
          history.push(`/${ROUTE.MENU}`);
        }
      })
      .catch(() => {
        dispatch(logInFailureAction());
      });
  };
};

// eslint-disable-next-line
export const getProfile = (): any => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(getProfileAction());

    authApi
      .getProfile()
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.response}`);
        }
      })
      .catch(() => {
        dispatch(logInRedirectAction());
      });
  };
};

// eslint-disable-next-line
export const logOut = (): any => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(logOutAction());

    authApi.logout().then((res) => {
      if (res && res.status === 200) {
        dispatch(logInRedirectAction());
      }
    });
  };
};
