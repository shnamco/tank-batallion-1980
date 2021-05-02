import { Action } from 'redux';
import { Leader } from '@store/leaderbord/interfaces/leader';

export enum LEADERBOARD_ACTIONS {
  GET_LEADERBOARD_SUCCESS = '[LEADERBOARD] GET LEADERBOARD SUCCESS',
  GET_LEADERBOARD_FAILED = '[LEADERBOARD] GET LEADERBOARD FAILED'
}

interface GetLeaderboardAction extends Action<LEADERBOARD_ACTIONS.GET_LEADERBOARD_SUCCESS> {
  payload: { list: Leader[] };
}

export const getLeaderboardSuccessAction = (list: Leader[]): GetLeaderboardAction => {
  return { type: LEADERBOARD_ACTIONS.GET_LEADERBOARD_SUCCESS, payload: { list } };
};

export const getLeaderboardFailedAction = (): Action<LEADERBOARD_ACTIONS.GET_LEADERBOARD_FAILED> => {
  return { type: LEADERBOARD_ACTIONS.GET_LEADERBOARD_FAILED };
};

export type LeaderboardActions = GetLeaderboardAction | Action<LEADERBOARD_ACTIONS.GET_LEADERBOARD_FAILED>;
