import { createSelector } from 'reselect';
import { RootState } from '@store/core/store';
import { Leader } from '@store/leaderbord/interfaces/leader';

export const selectLeaderboardReducer = createSelector(
  (state: RootState) => state.leaderboardReducer,
  (leaderboardReducer) => leaderboardReducer
);

export const selectLeaderList = createSelector(selectLeaderboardReducer, (leaderboardReducer) => leaderboardReducer.list.sort(compare));

const compare = <T extends Leader>(a: T, b: T): number => {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
};
