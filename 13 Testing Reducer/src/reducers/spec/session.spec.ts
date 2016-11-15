import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {sessionReducer} from '../session';
import {} from 'mocha'


describe('sessionReducer', () => {
  it('should return...', () => {
    // Arrange
    const initialState = undefined;
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
