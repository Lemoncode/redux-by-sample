import {actionsEnums} from '../common/actionsEnums';
import objectAssign = require('object-assign');
import {UserProfile} from '../model/userProfile';
import {LoginResponse} from '../model/loginResponse';
import {LoginEntity} from '../model/login';

class SessionState  {
  isUserLoggedIn : boolean;
  userProfile : UserProfile;
  editingLogin : LoginEntity;

  public constructor()
  {
    this.isUserLoggedIn = false;
    this.userProfile = new UserProfile();
    this.editingLogin = new LoginEntity();
  }
}

export const sessionReducer =  (state : SessionState = new SessionState(), action) => {
      switch (action.type) {
        case actionsEnums.USERPROFILE_PERFORM_LOGIN:
           return handlePerformLogin(state, action.payload);

        case actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN:
           return handleUpdateEditingLogin(state, action.payload);
      }

      return state;
};


const handlePerformLogin = (state : SessionState, payload : LoginResponse) => {
  const newState = objectAssign({}, state, {isUserLoggedIn: payload.succeeded, userProfile: payload.userProfile});
  return newState;
}

const handleUpdateEditingLogin = (state: SessionState, payload : LoginEntity) => {
  const newState = objectAssign({}, state, {editingLogin: payload});
  return newState;
}
