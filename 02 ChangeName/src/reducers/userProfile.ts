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
      return handleUserProfileAction(state, action.payload);
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

