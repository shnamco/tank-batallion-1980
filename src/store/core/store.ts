import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

export interface RootState {
  authReducer: AuthState;
}

export const store = createStore(
  combineReducers<RootState>({ authReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
