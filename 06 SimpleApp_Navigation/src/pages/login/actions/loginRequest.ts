import { actionsEnums } from '../../../common/actionsEnums';
import { LoginResponse, LoginEntity } from '../../../model';
import { login } from '../../../rest-api/loginApi';
import { push } from 'react-router-redux';
import { history } from '../../../history';

export const loginRequestStartedAction = (loginEntity: LoginEntity) => (dispatcher) => {
  const promise = login(loginEntity);

  promise.then((loginResponse) => {
    dispatcher(loginRequestCompletedAction(loginResponse));

    if (loginResponse.succeeded) {
      push('/student-list');
    }
  });

  return promise;
}

const loginRequestCompletedAction = (loginResponse: LoginResponse) => ({
  type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
  payload: loginResponse,
});
