import * as AuthActions from '@store/auth/auth.actions';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@store/core/store';
import { AnyAction } from 'redux';
import { environment } from '../../environment/environment';
import { ROUTE } from '../../interfaces/route';
import { HistoryProxy } from '../../interfaces/history';
import { authApi, LoginReq, Reason, SignUpReq } from '@services/auth_api';
import { oauthApi } from '@services/oauth_api';

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

export const getServiceId = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AuthActions.AuthActions>) => {
    oauthApi
      .serviceId(environment.redirectUri)
      .then((res) => {
        if (res.status === 200) {
          const id = res.response.service_id;

          window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}&redirect_uri=${environment.redirectUri}`;
        }
      })
      .catch(() => {
        dispatch(AuthActions.logInFailureAction());
      });
  };
};

export const loginWithYandex = (code: string, history: HistoryProxy): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AuthActions.AuthActions>) => {
    oauthApi
      .signIn({ code, redirect_uri: environment.redirectUri })
      .then((res) => {
        if (res.status === 200 || (res.response as Reason).reason === 'User already in system') {
          dispatch(AuthActions.logInSuccessAction());
          history.push(`/${ROUTE.MENU}`);
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
