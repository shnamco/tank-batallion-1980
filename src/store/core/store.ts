import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { profileReducer, ProfileState } from '@store/profile/profile.reducer';

export interface RootState {
  authReducer: AuthState;
  profile: ProfileState;
}

declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

const initialState = isServer ? undefined : window.__INITIAL_STATE__;

export const store = createStore(
  combineReducers<RootState>({ authReducer, profile: profileReducer }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
