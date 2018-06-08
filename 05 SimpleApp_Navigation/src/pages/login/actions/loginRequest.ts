import { actionsEnums } from '../../../common/actionsEnums';
import { LoginResponse } from '../../../model/loginResponse';
import { LoginEntity } from '../../../model/login';
import { loginApi } from '../../../rest-api/loginApi';
import { hashHistory } from 'react-router';

export const loginRequestStartedAction = (login: LoginEntity) => {
    return function (dispatcher) {
        const promise = loginApi.login(login);
        promise.then(
            data => {
                dispatcher(loginRequestCompletedAction(data));
                // This is not ideal to have it here, maybe move it to middleware?
                if (data.succeeded == true) {
                    hashHistory.push('/student-list');
                }
            }
        );
        return promise;
    }
}

const loginRequestCompletedAction = (loginResponse: LoginResponse) => {
    return {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: loginResponse
    }
}