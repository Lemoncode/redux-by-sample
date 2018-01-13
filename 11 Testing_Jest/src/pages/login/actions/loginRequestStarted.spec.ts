import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);
import { hashHistory } from 'react-router';

import { actionsEnums } from '../../../common/actionsEnums';
import { LoginEntity } from '../../../model/login';
import { loginApi } from '../../../rest-api/loginApi';
import { LoginResponse } from '../../../model/loginResponse';
import { loginRequestCompletedAction } from './loginRequestCompleted';
import { loginRequestStartedAction } from './loginRequestStarted';

describe('loginRequestStartedAction', () => {
  it('should call to login with LoginEntity when passing loginEntity data', () => {
    // Arrange
    const loginEntity = new LoginEntity();
    loginEntity.login = 'test login';
    loginEntity.password = 'test password';

    loginApi.login = jest.fn(() => {
      return {
        then: function() {
          return this;
        },
        catch: function() {
          return this;
        },
      };
    });

    // Act
    const store = mockStore();
    store.dispatch(loginRequestStartedAction(loginEntity))
      .then(() => {
        // Assert
        expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
      });
  });

  it('should call to loginRequestCompletedAction but not hashHistory when passing loginEntity data and expected succeeded equals false response', () => {
    // Arrange
    const loginEntity = new LoginEntity();
    loginEntity.login = 'test login';
    loginEntity.password = 'test password';

    const expectedResponse = new LoginResponse();
    expectedResponse.succeeded = false;

    loginApi.login = jest.fn(() => {
      return {
        then: function(callback) {
          callback(expectedResponse);
          return this;
        },
        catch: function() {
          return this;
        },
      };
    });

    hashHistory.push = jest.fn();

    // Act
    const store = mockStore();
    store.dispatch(loginRequestStartedAction(loginEntity))
      .then(() => {
        // Assert
        expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
        expect(store.getActions()[0].type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
        expect(store.getActions()[0].payload).toBe(expectedResponse);
        expect(hashHistory.push).not.toHaveBeenCalled();
      });
  });

  it('should call to loginRequestCompletedAction and hashHistory when passing loginEntity data and expected succeeded equals true response', () => {
    // Arrange
    const loginEntity = new LoginEntity();
    loginEntity.login = 'test login';
    loginEntity.password = 'test password';

    const expectedResponse = new LoginResponse();
    expectedResponse.succeeded = true;

    loginApi.login = jest.fn(() => {
      return {
        then: function(callback) {
          callback(expectedResponse);
          return this;
        },
        catch: function() {
          return this;
        },
      };
    });

    hashHistory.push = jest.fn();

    // Act
    const store = mockStore();
    store.dispatch(loginRequestStartedAction(loginEntity))
      .then(() => {
        // Assert
        expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
        expect(store.getActions()[0].type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
        expect(store.getActions()[0].payload).toBe(expectedResponse);
        expect(hashHistory.push).toHaveBeenCalledWith('/student-list');
      });
  });

  it('should call to catch when passing loginEntity data and server throw any error', () => {
    // Arrange
    const loginEntity = new LoginEntity();
    loginEntity.login = 'test login';
    loginEntity.password = 'test password';

    const expectedError = 'test error';

    loginApi.login = jest.fn(() => {
      return {
        then: function() {
          return this;
        },
        catch: function(callback) {
          callback(expectedError);
          return this;
        },
      };
    });

    hashHistory.push = jest.fn();

    console.error = jest.fn();

    // Act
    const store = mockStore();
    store.dispatch(loginRequestStartedAction(loginEntity))
      .then(() => {
        // Assert
        expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
        expect(hashHistory.push).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(expectedError);
      });
  });
});
