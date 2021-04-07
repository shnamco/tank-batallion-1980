import { AuthActions, getProfileAction, logInAction, logInFailureAction, logInSuccessAction } from '@store/auth/auth.actions';
import { authApi, LoginReq, Reason } from '@service/auth_api';
import { Dispatch } from 'react';
import { ROUTE } from '@utils/route';

// eslint-disable-next-line
export const logIn = (data: LoginReq, history: any): any => {
  return async (dispatch: Dispatch<AuthActions>) => {
    dispatch(logInAction());

    try {
      const res = await authApi.login(data);
      if (res.status === 200 || (res.response as Reason).reason === 'User already in system') {
        history.push(`/${ROUTE.MENU}`);
        dispatch(logInSuccessAction());
      }
    } catch (err) {
      dispatch(logInFailureAction());
    }
  };
};

// eslint-disable-next-line
export const getProfile = (history: any): any => {
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
        history.push(`/${ROUTE.LOGIN}`);
        dispatch(logInFailureAction());
      });
  };
};
