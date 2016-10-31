import {actionsEnums} from '../../../common/actionsEnums';
import {LoginEntity} from '../../../model/LoginEntity';
import {loginApi} from '../../../rest-api/loginApi';
import {loginRequestCompletedAction} from './loginRequestCompleted';

export const loginRequestStartedAction = (login : LoginEntity) => {
  return function(dispatcher) {
    const promise = loginApi.login(login);

    promise.then(
      data => dispatcher(loginRequestCompletedAction(data))
    );

    return promise;
  }
}
