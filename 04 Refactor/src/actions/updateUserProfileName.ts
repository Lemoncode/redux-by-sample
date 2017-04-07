import {actionsEnums} from '../common/actionsEnums';

export const updateUserProfileName = (newName : string) => {
  return {
    type: actionsEnums.UPDATE_USERPROFILE_NAME,
    newName : newName,
  }
}
