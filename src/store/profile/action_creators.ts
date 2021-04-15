import { ACTIONS } from './action_types';
import { ProfileAction, ProfileData, ProfileError } from './profile.reducer';
import { Dispatch } from 'redux';
import { profileApi, RequestData, Profile, Error } from '@service/profile_api';
import { authApi } from '@service/auth_api';

export const setProfile = (profile: Profile): ProfileData => {
  return {
    type: ACTIONS.SET_PROFILE,
    profile
  };
};

export const setError = (error: null | string): ProfileError => {
  return {
    type: ACTIONS.SET_ERROR,
    error
  };
};

export const requestProfile = () => {
  return (dispatch: Dispatch<ProfileAction>): void => {
    authApi.getProfile().then((res) => {
      if (res.status === 200) {
        dispatch(setProfile(res.response as Profile));
      }
    });
  };
};

export const changeProfile = (profile: RequestData) => {
  return async (dispatch: Dispatch<ProfileAction>): Promise<void> => {
    const res = await profileApi.changeProfile(profile);

    if (res.status === 200) {
      dispatch(setProfile(res.response as Profile));
      dispatch(setError(null));
    } else {
      dispatch(setError((res.response as Error).reason));
    }
  };
};
