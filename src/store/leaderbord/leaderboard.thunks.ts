import { ThunkAction } from 'redux-thunk';
import { RootState } from '@store/core/store';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';
import * as LeaderboardActions from '@store/leaderbord/leaderboard.actions';
import { leaderboardApi } from '@services/leaderboard_api';

export const getLeaderboard = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<LeaderboardActions.LeaderboardActions>) => {
    leaderboardApi.leaderboardList({ ratingFieldName: '', limit: 30, cursor: 0 }).then((res) => {
      if (res.status === 200) {
        dispatch(LeaderboardActions.getLeaderboardSuccessAction(res.response));
      }
    });
  };
};
