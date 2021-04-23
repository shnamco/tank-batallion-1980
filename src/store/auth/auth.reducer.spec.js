/* eslint-disable no-undef */
import { authReducer, initialState } from './auth.reducer';

describe('[TEST] auth.reducer', () => {
  test('should return initialState', () => {
    const testAction = { type: '[TEST]' };

    const newState = authReducer(initialState, testAction);

    expect(newState).toEqual(initialState);
    expect(newState).toBe(initialState);
  });
});
