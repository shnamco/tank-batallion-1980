import { Dispatch } from 'redux';
import { authApi } from '@service/auth_api';
import { Error, Profile, profileApi, RequestData } from '@service/profile_api';
import { ProfileAction, setError, setProfile } from '@store/profile/profile.actions';

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
