import {actionsEnums} from '../common/actionsEnums';
import {updateUserProfileName} from '../actions/updateUserProfileName';

class userProfileState {
  firstname : string;

  constructor() {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : userProfileState = new userProfileState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
  }

  return state;
};

const handleUserProfileAction = (state : userProfileState, action) => {
  return {
    ...state,
    firstname: action.newName,
  };
}
