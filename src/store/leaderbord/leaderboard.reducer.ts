import { LEADERBOARD_ACTIONS, LeaderboardActions } from '@store/leaderbord/leaderboard.actions';

export interface LeaderboardState {
  data: unknown[];
}

export const initialState: LeaderboardState = {
  data: []
};

export const leaderboardReducer = (state = initialState, action: LeaderboardActions): LeaderboardState => {
  switch (action.type) {
    case LEADERBOARD_ACTIONS.GET_LEADERBOARD: {
      return { ...state, data: action.payload.data };
    }
    default:
      return state;
  }
};
