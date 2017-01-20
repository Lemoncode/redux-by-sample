import {actionsEnums} from '../../../common/actionsEnums';
import {UserProfile} from '../../../model/view/userProfile';
import {LoginResponse} from '../../../model/view/loginResponse';
import {LoginEntity} from '../../../model/view/login';

export class Session  {
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

export const session =  (state : Session = new Session(), action) => {
      switch (action.type) {
        case actionsEnums.USERPROFILE_PERFORM_LOGIN:
           return handlePerformLogin(state, action.payload);

        case actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN:
           return handleUpdateEditingLogin(state, action.payload);
      }

      return state;
};


const handlePerformLogin = (state : Session, payload : LoginResponse) => {
  return {
    ...state,
    isUserLoggedIn: payload.succeeded,
    userProfile: payload.userProfile
  };
}

const handleUpdateEditingLogin = (state: Session, payload : LoginEntity) => {
  return {
    ...state,
    editingLogin: payload
  };
}
