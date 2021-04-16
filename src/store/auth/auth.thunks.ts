import * as AuthActions from '@store/auth/auth.actions';
import { authApi, LoginReq, Reason, SignUpReq } from '@service/auth_api';
import { Dispatch } from 'react';
import { ROUTE } from '@utils/route';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@store/core/store';
import { AnyAction } from 'redux';
import { HistoryProxy } from '@utils/history';

export const logIn = (
  data: LoginReq,
  onError: (response: string | Reason) => void,
  history: HistoryProxy
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<AuthActions.AuthActions>) => {
    dispatch(AuthActions.logInAction());

    authApi
      .login(data)
      .then((res) => {
        if (res.status === 200 || (res.response as Reason).reason === 'User already in system') {
          dispatch(AuthActions.logInSuccessAction());
          history.push(`/${ROUTE.MENU}`);
        } else {
          onError(res.response);
        }
      })
      .catch(() => {
        dispatch(AuthActions.logInFailureAction());
      });
  };
};

export const getProfile = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<AuthActions.AuthActions>) => {
    dispatch(AuthActions.getProfileAction());

    authApi
      .getProfile()
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.response}`);
        }
      })
      .catch(() => {
        dispatch(AuthActions.logInRedirectAction());
      });
  };
};

export const logOut = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<AuthActions.AuthActions>) => {
    dispatch(AuthActions.logOutAction());

    authApi.logout().then((res) => {
      if (res && res.status === 200) {
        dispatch(AuthActions.logInRedirectAction());
      }
    });
  };
};

export const signUp = (
  data: SignUpReq,
  onError: (response: string | Reason) => void,
  history: HistoryProxy
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<AuthActions.AuthActions>) => {
    dispatch(AuthActions.signUpAction());

    authApi
      .signUp(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(AuthActions.logInSuccessAction());
          history.push(`/${ROUTE.MENU}`);
        } else {
          onError(res.response);
        }
      })
      .catch(() => {
        dispatch(AuthActions.logInFailureAction());
      });
  };
};
