import { AuthActions, logInAction, logInFailureAction, logInSuccessAction } from '@store/auth/auth.actions';
import { authApi, LoginReq } from '@service/auth_api';
import { Dispatch } from 'react';

// eslint-disable-next-line
export const logIn = (data: LoginReq): any => {
  return (dispatch: Dispatch<AuthActions>) => {
    dispatch(logInAction());

    return authApi.login(data).then(
      () => dispatch(logInSuccessAction()),
      () => dispatch(logInFailureAction())
    );
  };
};
