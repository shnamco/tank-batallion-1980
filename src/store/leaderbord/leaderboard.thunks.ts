import { ThunkAction } from 'redux-thunk';
import { RootState } from '@store/core/store';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';
import * as LeaderboardActions from '@store/leaderbord/leaderboard.actions';
import { leaderboardApi, NewLeaderRequest } from '@services/leaderboard_api';

export const getLeaderboard = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<LeaderboardActions.LeaderboardActions>) => {
    leaderboardApi
      .leaderboardList({ ratingFieldName: 'battalionId', limit: 30, cursor: 0 })
      .then((res) => {
        if (res.status === 200) {
          dispatch(LeaderboardActions.getLeaderboardSuccessAction(res.response));
        } else {
          dispatch(LeaderboardActions.getLeaderboardFailedAction());
        }
      })
      .catch(() => {
        dispatch(LeaderboardActions.getLeaderboardFailedAction());
      });
  };
};

export const newLeader = (data: NewLeaderRequest): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch: Dispatch<LeaderboardActions.LeaderboardActions>) => {
    leaderboardApi
      .newLeader(data)
      .then((res) => {
        if (res.status !== 200) {
          dispatch(LeaderboardActions.getLeaderboardFailedAction());
        }
      })
      .catch(() => {
        dispatch(LeaderboardActions.getLeaderboardFailedAction());
      });
  };
};
