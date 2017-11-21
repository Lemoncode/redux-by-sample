import { actionsEnums } from '../../../common/actionsEnums';
import { LoginEntity } from '../../../model';

export const updateEditingLogin = (loginInfo: LoginEntity) => ({
  type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
  payload: loginInfo,
});
