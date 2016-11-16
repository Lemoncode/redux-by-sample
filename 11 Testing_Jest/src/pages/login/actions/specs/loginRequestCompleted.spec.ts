// @types global declarations https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types
import {actionsEnums} from '../../../../common/actionsEnums';
import {LoginResponse} from '../../../../model/loginResponse';
import {UserProfile} from '../../../../model/userProfile'
import {loginRequestCompletedAction} from '../loginRequestCompleted';

describe('loginRequestCompleted', () => {
  describe('#loginRequestCompletedAction', () => {
    it('should return action { type: USERPROFILE_PERFORM_LOGIN, payload: undefined } ' +
    'when passing loginResponse equals undefined', () => {
      //Arrange
      let loginResponse = undefined;

      //Act
      var result = loginRequestCompletedAction(loginResponse);

      //Assert
      expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
      expect(result.payload).toBeUndefined();
    });

    it('should return action { type: USERPROFILE_PERFORM_LOGIN, payload: null } ' +
    'when passing loginResponse equals null', () => {
      //Arrange
      let loginResponse = null;

      //Act
      var result = loginRequestCompletedAction(loginResponse);

      //Assert
      expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
      expect(result.payload).toBeNull();
    });

    it('should return action { type: USERPROFILE_PERFORM_LOGIN, payload: {succeeded: true} } ' +
    'when passing loginResponse equals {succeeded: true}', () => {
      //Arrange
      let loginResponse = new LoginResponse();
      loginResponse.succeeded = true;

      //Act
      var result = loginRequestCompletedAction(loginResponse);

      //Assert
      expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
      expect(result.payload.succeeded).toBeTruthy();
    });

    it('should return action { type: USERPROFILE_PERFORM_LOGIN, payload: {userProfile: {fullname: "test"}} } ' +
    'when passing loginResponse equals {userProfile: {fullname: "test"}}', () => {
      //Arrange
      let loginResponse = new LoginResponse();
      loginResponse.userProfile = new UserProfile();
      loginResponse.userProfile.fullname = "test";

      //Act
      var result = loginRequestCompletedAction(loginResponse);

      //Assert
      expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
      expect(result.payload.userProfile.fullname).toEqual("test");
    });
  })
});
