import {actionsEnums} from '../common/actionsEnums';

export const updateUserProfileName = (newName : string) => ({  
    type: actionsEnums.UPDATE_USERPROFILE_NAME,
    newName : newName,  
});
