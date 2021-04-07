import { AuthActions, logInSuccess } from '@store/auth/auth.actions';
import { Dispatch } from 'react';
import { RootState } from '@store/store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logIn = (username: string, password: string): ((dispatch: Dispatch<AuthActions>, getState: RootState) => Promise<void>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (dispatch, getState): Promise<void> => {
    dispatch(logInSuccess());
  };
};
