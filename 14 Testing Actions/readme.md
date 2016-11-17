# 12 Testing Infrastructure

This sample series takes as starting point _13 Testing Actions_

We will add unit testing to our actions.

Summary:

- Add a simple test to an synchronous action.
- Add a test to an asynchronous action (redux thunk based).

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Let's start by adding unit test support to the _loginRequestCompleted_ action.
We will implement a simple test, in the implemented sample code you can find
a battery of unit tests already implemented.

- Let's launch the tests:

```
npm test
```

- Now let's add test support for _loginRequestStarted_, this time we will have
to take care of handling and async all and mock and api request plus a router
navigation request.

_./src/pages/login/actions/specs/loginRequestCompleted.spec.ts_

```javascript
import { expect } from 'chai';
import { LoginResponse } from '../../../../model/loginResponse'
import { loginRequestCompletedAction } from '../loginRequestCompleted'
import { actionsEnums } from '../../../../common/actionsEnums'

describe('pages/login/loginRequestCompleted Action', () => {
  it('loginResponse informed', () => {
    // Arrange
    const loginResponse = new LoginResponse();

    loginResponse.succeeded = true;
    loginResponse.userProfile.fullname = 'john';
    loginResponse.userProfile.role = 'admin'

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).to.be.equal(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).to.be.true;
    expect(result.payload.userProfile.fullname).to.be.equal(loginResponse.userProfile.fullname)
    expect(result.payload.userProfile.role).to.be.equal(loginResponse.userProfile.role)
  })
});
```

- Let's launch the tests:

```
npm test
```

- Now it's time to go for a case that has a greater level of completexity, we are going
to test an async action (thunk) and we will have to mock dependencies (rest api),
the action we are going to test is _loginRequestStarted_

```javascript
import { expect } from 'chai';
import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import { loginApi } from '../../../../rest-api/loginApi';
import { UserProfile } from '../../../../model/userProfile'
import { LoginEntity } from '../../../../model/login'
import { LoginResponse } from '../../../../model/loginResponse'
import { loginRequestStartedAction } from '../loginRequestStarted'
import { loginRequestCompletedAction } from '../loginRequestCompleted'
import { actionsEnums } from '../../../../common/actionsEnums'
import { hashHistory } from 'react-router'


const middlewares = [ ReduxThunk ];
const mockStore = configureStore(middlewares);

describe('pages/login/loginRequestStarted Action', () => {
  it('loginRequest login succeeded', sinon.test((done) => {
    // Arrange
    const sinon : Sinon.SinonStatic = this;
    const loginInfo : LoginEntity = new LoginEntity();
    loginInfo.login = "john";
    loginInfo.password = "pass";

    const expectedLoginResponse = new LoginResponse();
    expectedLoginResponse.succeeded = true;
    expectedLoginResponse.userProfile = new UserProfile();
    expectedLoginResponse.userProfile.fullname = "john";
    expectedLoginResponse.userProfile.role = "admin";

    const loginMethodStub = sinon.stub(loginApi, 'login');

    loginMethodStub.returns({
      then: callback => {
        callback(expectedLoginResponse)
      }
    });

    const hashHistoryStub = sinon.stub(hashHistory, 'push');


    // Act
    const store = mockStore([]);

    store.dispatch(loginRequestStartedAction(loginInfo))
      .then(() => {
          // Assert
          expect(store.getActions()[0].type).to.be.equal(actionsEnums.USERPROFILE_PERFORM_LOGIN);
          expect(store.getActions()[0].payload.succeeded).to.be.true;
          expect(hashHistoryStub.called).to.be.true;
          done();
      });    
  }).bind(this))
});
```

- We have added unit tests to all the actions implemented in the project, just
download the repo and check have been implemented.

```javascript
npm test
```
