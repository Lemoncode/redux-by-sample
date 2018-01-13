import { actionsEnums } from '../../../common/actionsEnums';
import { LoginResponse } from '../../../model/loginResponse';
import { loginRequestCompletedAction } from './loginRequestCompleted';

describe('loginRequestCompletedAction', () => {
  it('should return action with type equals USERPROFILE_PERFORM_LOGIN and payload with values when passing loginResponse equals succeeded: true', () => {
    // Arrange
    const loginResponse = new LoginResponse();
    loginResponse.succeeded = true;
    loginResponse.userProfile = {
      fullname: 'test name',
      role: 'test role',
    };

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeTruthy();
    expect(result.payload.userProfile).toBe(loginResponse.userProfile);
  });

  it('should return action with type equals USERPROFILE_PERFORM_LOGIN and payload with values when passing loginResponse equals succeeded: false', () => {
    // Arrange
    const loginResponse = new LoginResponse();
    loginResponse.succeeded = false;
    loginResponse.userProfile = {
      fullname: 'test name',
      role: 'test role',
    };

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeFalsy();
    expect(result.payload.userProfile).toBe(loginResponse.userProfile);
  });
});
