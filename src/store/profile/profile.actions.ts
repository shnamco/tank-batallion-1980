import { Profile } from '../../services/profile_api';
import { Action } from 'redux';

export enum PROFILE_ACTIONS {
  SET_PROFILE = '[PROFILE] SET PROFILE',
  SET_ERROR = '[PROFILE] SET ERROR'
}

interface SetProfileAction extends Action<PROFILE_ACTIONS.SET_PROFILE> {
  payload: { profile: Profile };
}
interface ProfileErrorAction extends Action<PROFILE_ACTIONS.SET_ERROR> {
  payload: { error: null | string };
}

export const setProfile = (profile: Profile): SetProfileAction => {
  return {
    type: PROFILE_ACTIONS.SET_PROFILE,
    payload: { profile }
  };
};

export const setError = (error: null | string): ProfileErrorAction => {
  return {
    type: PROFILE_ACTIONS.SET_ERROR,
    payload: { error }
  };
};

export type ProfileAction = SetProfileAction | ProfileErrorAction;
