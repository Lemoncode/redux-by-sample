import {actionsEnums} from '../../../common/actionsEnums';
import {LoginEntity} from '../../../model/view/login';

export const updateEditingLogin = (loginInfo : LoginEntity) => {
  return {
    type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
    payload: loginInfo
  }
}
