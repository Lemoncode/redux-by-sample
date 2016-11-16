import {} from 'core-js';
import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
const middlewares = [ ReduxThunk ];
const mockStore = configureStore(middlewares);

import {loginRequestStartedAction} from '../loginRequestStarted';
import {loginApi} from '../../../../rest-api/loginApi';
import {actionsEnums} from '../../../../common/actionsEnums';

describe('loginRequestStarted', () => {
  describe('#loginRequestStartedAction', () => {
    it('', () => {
      //Arrange
      let login = undefined;

      let expectedAction = {
        type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
        payload: undefined
      };

      loginApi.login = jest.fn(() => {
        return  {
          then: callback => {
            callback(expectedAction);
          }
        };
      });

      //Act
      const store = mockStore([]);

      store.dispatch(loginRequestStartedAction(login))
        .then(() => {
          //Assert
          expect(loginApi.login).toHaveBeenCalledWith(login);
          expect(store.getActions()[0].type).toBe(expectedAction.type);
        });
    });
  });
});
