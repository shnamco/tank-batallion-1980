import { Profile } from '@service/profile_api';
import { ACTIONS } from './action_types';

export type ProfileState = {
  data: Profile;
  error: null | string;
};

const initialState: ProfileState = {
  data: {
    id: null,
    first_name: null,
    second_name: null,
    display_name: null,
    avatar: null,
    email: null,
    login: null,
    phone: null
  },
  error: null
};

export type ProfileAction = ProfileData | ProfileError;

export type ProfileData = {
  type: ACTIONS.SET_PROFILE;
  profile: Profile;
};

export type ProfileError = {
  type: ACTIONS.SET_ERROR;
  error: null | string;
};

export const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case ACTIONS.SET_PROFILE:
      return {
        ...state,
        data: action.profile
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
