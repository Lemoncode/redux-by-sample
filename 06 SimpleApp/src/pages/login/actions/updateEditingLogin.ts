import {actionsEnums} from '../../../common/actionsEnums';
import {LoginEntity} from '../../../model/login';

export const loginAction = (loginInfo : LoginEntity) => {
  return {
    type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
    payload: loginInfo
  }
}
