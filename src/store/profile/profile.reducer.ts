import { Profile } from '@service/profile_api';
import { PROFILE_ACTIONS, ProfileAction } from '@store/profile/profile.actions';

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

export const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      return { ...state, data: action.payload.profile };

    case PROFILE_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};
