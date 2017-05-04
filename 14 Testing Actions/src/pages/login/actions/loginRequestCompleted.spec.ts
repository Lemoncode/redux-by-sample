import { expect } from 'chai';
import { LoginResponse } from '../../../model/loginResponse'
import { loginRequestCompletedAction } from './loginRequestCompleted'
import { actionsEnums } from '../../../common/actionsEnums'

describe('pages/login/loginRequestCompleted Action', () => {
  it('loginResponse informed', () => {
    // Arrange
    const loginResponse = new LoginResponse();

    loginResponse.succeeded = true;
    loginResponse.userProfile = {fullname : 'john', role: 'admin'}

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).to.be.equal(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).to.be.true;
    expect(result.payload.userProfile.fullname).to.be.equal(loginResponse.userProfile.fullname)
    expect(result.payload.userProfile.role).to.be.equal(loginResponse.userProfile.role)
  })
});
