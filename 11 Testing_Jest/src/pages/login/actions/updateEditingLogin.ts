import {actionsEnums} from '../../../common/actionsEnums';
import {LoginEntity} from '../../../model/login';

export const updateEditingLogin = (loginInfo : LoginEntity) => {
  return {
    type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
    payload: loginInfo
  }
}
