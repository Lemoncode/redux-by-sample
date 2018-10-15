import { actionsEnums } from '../common/actionsEnums';

export interface UserProfileState {
  firstname: string;
}

const defaultUserState: () => UserProfileState = () => ({
  firstname: 'John Doe'
});

export const userProfileReducer = (state = defaultUserState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
  }

  return state;
}

const handleUserProfileAction = (state: UserProfileState, action) => {
  return {
    ...state,
    firstname: action.newName,
  };
}

