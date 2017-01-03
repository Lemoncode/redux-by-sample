import {actionsEnums} from '../../../common/actionsEnums';
import {LoginResponse} from '../../../model/view/loginResponse';

export const loginRequestCompletedAction = (loginResponse : LoginResponse) => {
  return {
    type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
    payload: loginResponse
  }
}
