import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {sessionReducer} from '../session';
import {UserProfile} from '../../model/userProfile';
import {LoginEntity} from '../../model/login';
import {} from 'mocha'
import {} from 'core-js'


describe('sessionReducer', () => {
  it('should return...', () => {
    // Arrange
    const initialState = {  isUserLoggedIn : false,
                            userProfile : new UserProfile(),
                            editingLogin : new LoginEntity()
                          };
    const action = {
      type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
      payload: {
        succeeded : true,
        userProfile : {
          fullname : 'John Doe',
          role : 'admin'
        }
      }
    };

    // Act
    const finalState = sessionReducer(initialState, action);

    // Assert
    expect(finalState).not.to.be.undefined;
    expect(finalState.isUserLoggedIn).to.be.true;

  });
});
