# 12 Testing Infrastructure

This sample series takes as starting point _12 Testing Infrastructure_

We will add unit testing to our reducers.

Summary:

- Add a simple test to session reducer.
- Add deep-freeze check.
- Implement rest of unit tests for session reducer.
- Implement unit test support for student reducer.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Let's create start by creating a spec file and a first test, let's first import what we need.

_./src/reducers/spec/session.spec.ts_

```javascript
import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums'
import {sessionReducer} from '../session'

```

Now let's add a simple test

```javascript
describe('sessionReducer', () => {
  describe('#handlePerformLogin', () => {
    it('Store successful login information in the store', () => {
      // Arrange
      const initialState = {  isUserLoggedIn : false,
                              userProfile : new UserProfile(),
                              editingLogin : new LoginEntity()
                            };

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
  });
});
```

- A final check for this test, reducers should be immutable, we can check this
in the unit tests by using deepfreeze library.

```javascript
describe('sessionReducer', () => {
  describe('#handlePerformLogin', () => {
    it('Store successful login information in the store', () => {
      // Arrange
      const initialState = {  isUserLoggedIn : false,
                              userProfile : new UserProfile(),
                              editingLogin : new LoginEntity()
                            };

      deepFreeze(initialState);

      //(...)

      // Assert
      expect(finalState).not.to.be.undefined;
      expect(finalState.isUserLoggedIn).to.be.true;
      expect(finalState.userProfile.fullname).to.be.equal(userFullname)
      expect(finalState.userProfile.role).to.be.equal(role)
    });
  });
});
```

- Now if you want to run the test you can make it in two flavours:

Just by executing the test once and using phantom browser (nice approach if you want
to add it as part of a CI build, e.g. travis)

```
npm test
```

Keep it executing forever (rerun on any file change) and run it using a real browser
(e.g. Chrome).

```
karma start
```

> you will probably need to install karma-cli as a global dependency


In the sample code you can find more a batter of unit tests implemented per reducer,
you can check it out directly in the repository code (some of this unit tests
detected bugs and they have been corrected as well on the main code).
