// @types global declarations https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types
import {actionsEnums} from '../../../../common/actionsEnums';
import {LoginResponse} from '../../../../model/loginResponse';
import {UserProfile} from '../../../../model/userProfile'
import {loginRequestCompletedAction} from '../loginRequestCompleted';

describe('loginRequestCompletedAction', () => {
  it('When passing loginResponse equals undefined. ' +
  'Should returns action { type: USERPROFILE_PERFORM_LOGIN, payload: undefined }', () => {
    //Arrange
    let loginResponse = undefined;

    //Act
    var result = loginRequestCompletedAction(loginResponse);

    //Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload).toBeUndefined();
  });

  it('When passing loginResponse equals null. ' +
  'Should returns action { type: USERPROFILE_PERFORM_LOGIN, payload: null }', () => {
    //Arrange
    let loginResponse = null;

    //Act
    var result = loginRequestCompletedAction(loginResponse);

    //Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload).toBeNull();
  });

  it('When passing loginResponse equals {succeeded: true}. ' +
  'Should returns action { type: USERPROFILE_PERFORM_LOGIN, payload: {succeeded: true} }', () => {
    //Arrange
    let loginResponse = new LoginResponse();
    loginResponse.succeeded = true;

    //Act
    var result = loginRequestCompletedAction(loginResponse);

    //Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeTruthy();
  });

  it('When passing loginResponse equals {userProfile: {fullname: "test"}}. ' +
  'Should returns action { type: USERPROFILE_PERFORM_LOGIN, payload: {userProfile: {fullname: "test"}} }', () => {
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
});
