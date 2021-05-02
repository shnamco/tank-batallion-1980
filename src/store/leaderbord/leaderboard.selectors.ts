import { createSelector } from 'reselect';
import { RootState } from '@store/core/store';

export const selectLeaderboardReducer = createSelector(
  (state: RootState) => state.leaderboardReducer,
  (leaderboardReducer) => leaderboardReducer
);
