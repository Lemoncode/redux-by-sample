import {actionsEnums} from '../../../../common/actionsEnums';
import {LoginResponse} from '../../../../model/loginResponse';
import {UserProfile} from '../../../../model/userProfile';
import {loginRequestCompletedAction} from '../loginRequestCompleted';

describe('loginRequestCompletedAction', () => {
  it('When passing loginResponse equals {succeeded: true}' +
  'Should return action { type: USERPROFILE_PERFORM_LOGIN, payload: {succeeded: true} }', () => {
    // Arrange
    const loginResponse = new LoginResponse();
    loginResponse.succeeded = true;

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeTruthy();
  });
});
