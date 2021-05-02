import { createSelector } from 'reselect';
import { RootState } from '@store/core/store';

export const selectLeaderboardReducer = createSelector(
  (state: RootState) => state.leaderboardReducer,
  (leaderboardReducer) => leaderboardReducer
);

export const selectLeaderList = createSelector(selectLeaderboardReducer, (leaderboardReducer) =>
  leaderboardReducer.list.map((item) => ({ ...item.data }))
);
