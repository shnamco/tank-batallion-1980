import { createSelector } from 'reselect';
import { RootState } from '../core/store';

export const selectAuthReducer = createSelector(
  (state: RootState) => state.authReducer,
  (authReducer) => authReducer
);

export const selectIsLoggedIn = createSelector(selectAuthReducer, (authReducer) => authReducer.isLoggedIn);
