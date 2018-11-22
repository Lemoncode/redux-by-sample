import { actionsEnums } from '../common/actionsEnums';
import { Color } from "../model/color";

export interface UserProfileState {
  firstname: string;
  favouriteColor: Color;
}

const defaultUserState: () => UserProfileState = () => ({
  firstname: 'John Doe',
  favouriteColor: { red: 0, green: 0, blue: 180 },
});

export const userProfileReducer = (state = defaultUserState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action.payload);
    case actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR:
      return handleFavouriteColorAction(state, action);
  }

  // Later on we will have a switch statement to replace state on changes.
  return state;
}

const handleUserProfileAction = (state: UserProfileState, firstname) => {
  return {
    ...state,
    firstname,
  };
}

const handleFavouriteColorAction = (state: UserProfileState, action) => {
  return {
    ...state,
    favouriteColor: action.newColor,
  };
};

