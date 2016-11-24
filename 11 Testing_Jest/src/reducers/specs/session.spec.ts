import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {UserProfile} from '../../model/userProfile';
import {LoginEntity} from '../../model/login';
import {sessionReducer} from '../session';

describe('session', () => {
  describe('#handlePerformLogin', () => {
    it('When passing initialState equals undefined and an empty action. ' +
    'Should returns new SessionState with default values', () => {
      //Arrange
      let initialState = undefined;
      let action = {};

      //Act
      let finalState = sessionReducer(initialState, action);

      //Assert
      expect(finalState.isUserLoggedIn).toBeFalsy();
      expect(finalState.userProfile).toEqual(new UserProfile());
      expect(finalState.editingLogin).toEqual(new LoginEntity());
    });

    it('When passing initialState with defaul values and an action type USERPROFILE_PERFORM_LOGIN with successful values. ' +
    'Should returns new immutable SessionState with isUserLoggedIn and userProfile equal payload values', () => {
      //Arrange
      let initialState = {
        isUserLoggedIn: false,
        userProfile: new UserProfile(),
        editingLogin: new LoginEntity()
      };

      deepFreeze(initialState);

      let action = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: {
          succeeded: true,
          userProfile: {
            fullname: 'Jonh Doe',
            role: 'admin'
          },
        }
      };

      //Act
      let finalState = sessionReducer(initialState, action);

      //Assert
      expect(finalState.isUserLoggedIn).toBeTruthy();
      expect(finalState.userProfile.fullname).toEqual("Jonh Doe");
      expect(finalState.userProfile.role).toEqual("admin");
    });

    it('When passing initialState with defaul values and an action type USERPROFILE_PERFORM_LOGIN with failed values. ' +
    'Should returns new immutable SessionState with isUserLoggedIn and userProfile equal payload values', () => {
      //Arrange
      let initialState = {
        isUserLoggedIn: false,
        userProfile: new UserProfile(),
        editingLogin: new LoginEntity()
      };

      deepFreeze(initialState);

      let action = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: {
          succeeded: false,
          userProfile: null,
        }
      };

      //Act
      let finalState = sessionReducer(initialState, action);

      //Assert
      expect(finalState.isUserLoggedIn).toBeFalsy();
      expect(finalState.userProfile).toBeNull();
    });
  });

  describe('#handleUpdateEditingLogin', () => {
    it('When passing initialState with defaul values and an action type USERPROFILE_UPDATE_EDITING_LOGIN with values. ' +
    'Should returns new immutable SessionState with editingLogin equals payload values', () => {
      //Arrange
      let initialState = {
        isUserLoggedIn: false,
        userProfile: new UserProfile(),
        editingLogin: new LoginEntity()
      };

      deepFreeze(initialState);

      let action = {
        type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
        payload: {
          login: 'Jonh Doe',
          password: 'test'
        }
      };

      //Act
      let finalState = sessionReducer(initialState, action);

      //Assert
      expect(finalState.editingLogin.login).toEqual("Jonh Doe");
      expect(finalState.editingLogin.password).toEqual("test");
    });
  });
});
