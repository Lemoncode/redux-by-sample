import * as deepFreeze from 'deep-freeze';
import { actionsEnums } from '../common/actionsEnums';
import { UserProfile } from '../model/userProfile';
import { LoginResponse } from '../model/loginResponse';
import { LoginEntity } from '../model/login';
import { sessionReducer } from './session';

describe('session reducer', () => {
  it('should return same state when passing wrong action type', () => {
    // Arrange
    const initialState = {
      isUserLoggedIn: false,
      userProfile: new UserProfile(),
      editingLogin: new LoginEntity(),
    };

    const action = {
      type: 'Wrong action type',
    };

    deepFreeze(initialState);

    // Act
    const result = sessionReducer(initialState, action);

    // Assert
    expect(result).toBe(initialState);
  });

  describe('handlePerformLogin', () => {
    it('should return new immutable state with updated values when passing initial state with default values and action with payload', () => {
      // Arrange
      const initialState = {
        isUserLoggedIn: false,
        userProfile: new UserProfile(),
        editingLogin: new LoginEntity(),
      };

      const action = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: {
          succeeded: true,
          userProfile: {
            fullname: 'Jonh Doe',
            role: 'admin'
          },
        } as LoginResponse,
      };

      deepFreeze(initialState);

      // Act
      const result = sessionReducer(initialState, action);

      // Assert
      expect(result.isUserLoggedIn).toBe(action.payload.succeeded);
      expect(result.userProfile).toBe(action.payload.userProfile);
    });
  });

  describe('handleUpdateEditingLogin', () => {
    it('should return new immutable state with updated values when passing initial state with default values and action with payload', () => {
      // Arrange
      const initialState = {
        isUserLoggedIn: false,
        userProfile: new UserProfile(),
        editingLogin: new LoginEntity(),
      };

      const action = {
        type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
        payload: {
          login: 'test login',
          password: 'test password'
        } as LoginEntity,
      };

      deepFreeze(initialState);

      // Act
      const result = sessionReducer(initialState, action);

      // Assert
      expect(result.isUserLoggedIn).toBe(initialState.isUserLoggedIn);
      expect(result.userProfile).toBe(initialState.userProfile);
      expect(result.editingLogin).toBe(action.payload);
    });
  });
});
