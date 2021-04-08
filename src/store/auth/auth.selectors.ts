import { createSelector } from 'reselect';
import { RootState } from '../core/store';

export const authReducer = createSelector(
  (state: RootState) => state.authReducer,
  (authReducer) => authReducer
);

export const isLoggedIn = createSelector(authReducer, (authReducer) => authReducer.isLoggedIn);
