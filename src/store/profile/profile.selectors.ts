import { createSelector } from 'reselect';
import { RootState } from '../core/store';

export const selectProfileReducer = createSelector(
  (state: RootState) => state.profile,
  (profileReducer) => profileReducer
);

export const selectProfile = createSelector(selectProfileReducer, (profileReducer) => profileReducer.data);
export const selectProfileError = createSelector(selectProfileReducer, (profileReducer) => profileReducer.error);
