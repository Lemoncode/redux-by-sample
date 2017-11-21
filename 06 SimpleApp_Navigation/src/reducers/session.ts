import { actionsEnums } from '../common/actionsEnums';
import {
  UserProfile,
  createEmptyUserProfile,
  LoginEntity,
  createEmptyLoginEntity,
  LoginResponse,
} from '../model';

export interface SessionState {
  isUserLoggedIn: boolean;
  userProfile: UserProfile;
  loginEntity: LoginEntity;
}

const createEmptyState = (): SessionState => ({
  isUserLoggedIn: false,
  userProfile: createEmptyUserProfile(),
  loginEntity: createEmptyLoginEntity(),
})

export const sessionReducer = (state = createEmptyState(), action) => {
  switch (action.type) {
    case actionsEnums.USERPROFILE_PERFORM_LOGIN:
      return userProfilePerformLoginHandler(state, action.payload);

    case actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN:
      return userProfileUpdateEditingLoginHandler(state, action.payload);
  }

  return state;
}

const userProfilePerformLoginHandler = (state: SessionState, payload: LoginResponse) => ({
  ...state,
  isUserLoggedIn: payload.succeeded,
  userProfile: payload.userProfile,
});

const userProfileUpdateEditingLoginHandler = (state: SessionState, payload: LoginEntity) => ({
  ...state,
  loginEntity: payload,
});
