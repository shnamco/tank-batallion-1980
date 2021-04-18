/* eslint-disable no-undef */
import { profileReducer, initialState } from './profile.reducer';

describe('[TEST] profile.reducer', () => {
  test('should return initialState', () => {
    const testAction = { type: '[TEST]' };

    const newState = profileReducer(initialState, testAction);

    expect(newState).toEqual(initialState);
    expect(newState).toBe(initialState);
  });
});
