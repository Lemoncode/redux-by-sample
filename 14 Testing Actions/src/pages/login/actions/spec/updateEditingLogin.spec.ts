import { expect } from 'chai';
import { LoginEntity } from '../../../../model/login'
import { updateEditingLogin } from '../updateEditingLogin'
import { actionsEnums } from '../../../../common/actionsEnums'

describe('pages/login/updateEditingLogin Action', () => {
  it('LoginInfo informed', () => {
    // Arrange
    const loginInfo : LoginEntity = new LoginEntity();

    loginInfo.login = "test";
    loginInfo.password = "pass";

    // Act
    const result = updateEditingLogin(loginInfo);

    // Assert
    expect(result.type).to.be.equal(actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN);
    expect(result.payload.login).to.be.equal(loginInfo.login);
    expect(result.payload.password).to.be.equal(loginInfo.password);        
  })
});
