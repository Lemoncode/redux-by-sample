import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {UserProfile} from '../../model/userProfile';
import {LoginEntity} from '../../model/login';
import {sessionReducer} from '../session';

describe('sessionReducer', () => {
  describe('#handlePerformLogin', () => {
    it(`When passing initialState with defaul values and an action type USERPROFILE_PERFORM_LOGIN with successful values.
    Should returns new immutable SessionState with payload values`, () => {
      //Arrange
      const initialState = {
        isUserLoggedIn: false,
        userProfile: new UserProfile(),
        editingLogin: new LoginEntity()
      };

      const action = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: {
          succeeded: true,
          userProfile: {
            fullname: 'Jonh Doe',
            role: 'admin'
          },
        }
      };

      deepFreeze(initialState);

      //Act
      const finalState = sessionReducer(initialState, action);

      //Assert
      expect(finalState.isUserLoggedIn).toBeTruthy();
      expect(finalState.userProfile.fullname).toEqual("Jonh Doe");
      expect(finalState.userProfile.role).toEqual("admin");
      expect(finalState.editingLogin).toEqual(new LoginEntity());
    });
  });
});
