import {actionsEnums} from '../common/actionsEnums';
import {updateUserProfileName} from '../actions/updateUserProfileName';
import objectAssign = require('object-assign');

class userProfileState  {
  firstname : string;

  public constructor()
  {
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
  const newState = objectAssign({}, state, {firstname: action.newName});
  return newState;
}
