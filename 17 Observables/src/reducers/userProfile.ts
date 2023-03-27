import { actionsEnums } from "../common/actionsEnums";
import { updateUserProfileName } from "../actions/updateUserProfileName";
import { Color } from "../model/color";
import objectAssign = require("object-assign");

class UserProfileState  {
  firstname: string;
  favouriteColor: Color;

  public constructor() {
    this.firstname = "Default name";
    this.favouriteColor = {red: 0, green: 0, blue: 180};
  }
}

export const userProfileReducer =  (state: UserProfileState = new UserProfileState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
    case actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR:
      return handleFavouriteColorAction(state, action);
  }

  return state;
};

const handleFavouriteColorAction = (state: UserProfileState, action) => {
  const newState = objectAssign({}, state, {favouriteColor: action.newColor});
  return newState;
};

const handleUserProfileAction = (state: UserProfileState, action) => {
  const newState = objectAssign({}, state, {firstname: action.newName});
  return newState;
};
