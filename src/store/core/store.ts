import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { profileReducer, ProfileState } from '@store/profile/profile.reducer';

export interface RootState {
  authReducer: AuthState;
  profile: ProfileState;
}

export const store = createStore(
  combineReducers<RootState>({ authReducer, profile: profileReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
