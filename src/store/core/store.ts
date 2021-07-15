import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { profileReducer, ProfileState } from '@store/profile/profile.reducer';
import { leaderboardReducer, LeaderboardState } from '@store/leaderbord/leaderboard.reducer';
import { isServer } from '@utils/is_server';

export interface RootState {
  authReducer: AuthState;
  profile: ProfileState;
  leaderboardReducer: LeaderboardState;
}

export const store = createStore(
  combineReducers<RootState>({ authReducer, profile: profileReducer, leaderboardReducer }),
  isServer ? undefined : window.__INITIAL_STATE__,
  composeWithDevTools(applyMiddleware(thunk))
);
