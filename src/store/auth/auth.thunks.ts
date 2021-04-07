import { AuthActions, logInAction, logInFailureAction, logInSuccessAction } from '@store/auth/auth.actions';
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
