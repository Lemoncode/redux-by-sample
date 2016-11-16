import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {sessionReducer} from '../session';
import {UserProfile} from '../../model/userProfile';
import {LoginEntity} from '../../model/login';
import {} from 'mocha'
import {} from 'core-js'

// http://stackoverflow.com/questions/19298118/what-is-the-role-of-describe-in-mocha
describe('sessionReducer', () => {
  describe('#handlePerformLogin', () => {
    it('Store successful login information in the store', () => {
      // Arrange
      const initialState = {  isUserLoggedIn : false,
                              userProfile : new UserProfile(),
                              editingLogin : new LoginEntity()
                            };

      deepFreeze(initialState);

      const userFullname = 'John Doe';
      const role = 'admin';

      const action = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: {
          succeeded : true,
          userProfile : {
            fullname : userFullname,
            role : role
          }
        }
      };

      // Act
      const finalState = sessionReducer(initialState, action);

      // Assert
      expect(finalState).not.to.be.undefined;
      expect(finalState.isUserLoggedIn).to.be.true;
      expect(finalState.userProfile.fullname).to.be.equal(userFullname)
      expect(finalState.userProfile.role).to.be.equal(role)
    });

    it('Store failed login information in the store', () => {
      // Arrange
      const initialState = {  isUserLoggedIn : false,
                              userProfile : null,
                              editingLogin : null
                            };

      deepFreeze(initialState);


      const action = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: {
          succeeded : false,
          userProfile : null
        }
      };

      // Act
      const finalState = sessionReducer(initialState, action);

      // Assert
      expect(finalState).not.to.be.undefined;
      expect(finalState.isUserLoggedIn).to.be.false;
      expect(finalState.userProfile).to.be.equal(null)
    });

  });

  describe('#handleUpdateEditingLogin', () => {
    it('Update initial editingLogin information', () => {
      // Arrange
      const initialState = {  isUserLoggedIn : false,
                              userProfile : new UserProfile(),
                              editingLogin : new LoginEntity()
                            };

      deepFreeze(initialState);

      const loginInfo = new LoginEntity();
      loginInfo.login = "john";
      loginInfo.password = "test";

      const action = {
        type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
        payload: loginInfo
      };

      // Act
      const finalState = sessionReducer(initialState, action);

      // Assert
      expect(finalState).not.to.be.undefined;
      expect(finalState.editingLogin.login).to.be.equal(loginInfo.login);
      expect(finalState.editingLogin.password).to.be.equal(loginInfo.password)
    });
  });
});
