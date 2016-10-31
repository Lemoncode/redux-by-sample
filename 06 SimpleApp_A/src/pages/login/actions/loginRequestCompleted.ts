import {actionsEnums} from '../../../common/actionsEnums';
import {LoginResponse} from '../../../model/loginResponse';

export const loginRequestCompletedAction = (loginResponse : LoginResponse) => {
  return {
    type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
    payload: loginResponse
  }
}
