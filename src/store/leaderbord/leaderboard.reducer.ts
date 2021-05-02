import { LEADERBOARD_ACTIONS, LeaderboardActions } from '@store/leaderbord/leaderboard.actions';
import { Leader } from '@store/leaderbord/interfaces/leader';

export interface LeaderboardState {
  list: Leader[];
}

export const initialState: LeaderboardState = {
  list: []
};

export const leaderboardReducer = (state = initialState, action: LeaderboardActions): LeaderboardState => {
  switch (action.type) {
    case LEADERBOARD_ACTIONS.GET_LEADERBOARD_SUCCESS: {
      return { ...state, list: action.payload.list };
    }
    default:
      return state;
  }
};
