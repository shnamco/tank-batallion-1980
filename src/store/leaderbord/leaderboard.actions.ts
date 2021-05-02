import { Action } from 'redux';

export enum LEADERBOARD_ACTIONS {
  GET_LEADERBOARD = '[LEADERBOARD] GET LEADERBOARD'
}

interface GetLeaderboardAction extends Action<LEADERBOARD_ACTIONS.GET_LEADERBOARD> {
  payload: { data: unknown[] };
}

export const getLeaderboardSuccessAction = (data: unknown[]): GetLeaderboardAction => {
  return { type: LEADERBOARD_ACTIONS.GET_LEADERBOARD, payload: { data } };
};

export type LeaderboardActions = GetLeaderboardAction;
