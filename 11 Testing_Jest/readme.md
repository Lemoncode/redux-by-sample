# 11 Testing_Jest

This sample series takes as starting point _10 HotLoader_

In this sample we are going to add unit testing with Jest:

- We will add configuration to work with Webpack TypeScript and Jest.
- We will add some unit tests:
    - actions
    - reducers
    - components
- We will add code coverage.

Summary steps:
- Add all the needed packages.
- Configure Jest.


# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (>=v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _10 HotLoader_ and execute _npm install_.

Let's start by installing the testing libraries:

### Jest libs:
- [jest](https://github.com/facebook/jest): JavaScript Testing library with runner, assertion, mocks, etc.
- [@types/jest](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/jest): Typings for jest.
- [ts-jest](https://github.com/kulshekhar/ts-jest): A preprocessor with sourcemap support to help use Typescript with Jest.
- [raf](https://github.com/chrisdickinson/raf): `requestAnimationFrame` polyfill for node and browser. Needed for React >= 16

### Render React component libs:
We have two options for render components: `react-test-renderer` or `enzyme`.
- [react-test-renderer](https://www.npmjs.com/package/react-test-renderer): provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
  - Pros: no necessary other library to snapshot testing
  - Cons: hard to test DOM events or other manipulation.

- [enzyme](https://github.com/airbnb/enzyme): Testing utility for React that makes it easier to work with DOM.
  - Pros: intuitive API for DOM manipulation.
  - Cons: it needs to install other libraries to snapshot testing,
- [@types/enzyme](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/enzyme): Typings for enzyme.
- [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json): Convert enzyme wrappers to snapshot testing.
- [enzyme-adapter-react-16](https://github.com/airbnb/enzyme/tree/master/packages/enzyme-adapter-react-16): Enzyme adapter for React 16.

### Other useful libraries
- [deep-freeze](https://github.com/substack/deep-freeze): To ensure immutability of the reducers.
- [@types/deep-freeze](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/deep-freeze): Typings for deep-freeze.
- [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store): A mock store for testing your redux async action creators and middleware.
- [@types/redux-mock-store](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/redux-mock-store): Typings for redux-mock-store.

  ```bash
  npm install jest @types/jest ts-jest raf --save-dev
  npm install enzyme @types/enzyme enzyme-to-json enzyme-adapter-react-16 --save-dev
  npm install deep-freeze @types/deep-freeze redux-mock-store @types/redux-mock-store --save-dev

  ```

## Configuration

- Jest test commands:
  - `npm test`: to single run
  - `npm run test:watch`: to run all specs after changes.

NOTE:
> --watchAll To rerun all tests.

> --watch To rerun tests related to changed files.

> --verbose Display individual test results with the test suite hierarchy.

> -i or --runInBand Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging

### ./package.json
```diff
{
  ...
  "scripts": {
    "start": "webpack-dev-server",
-   "build": "webpack"
+   "build": "webpack",
+   "test": "jest --verbose",
+   "test:watch": "jest --watchAll --verbose -i"
  },
  ...
}
```

- [Jest configuration](https://facebook.github.io/jest/docs/en/configuration.html):

### ./package.json

```diff
{
  ...
  "dependencies": {
    ...
- }
+ },
+ "jest": {
+   "testRegex": "\\.spec\\.tsx?$",
+   "moduleFileExtensions": [
+     "js",
+     "jsx",
+     "json",
+     "ts",
+     "tsx"
+   ]
}

```

- Set up polyfills _config/test/polyfills.js and add `raff`:

### config/test/polyfills.js

```js
// Polyfill requestAnimationFrame required by React >=16.0.0
require('raf/polyfill');

```

### ./package.json

```diff
{
  ...
  "jest": {
    "testRegex": "\\.spec\\.tsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx"
-   ]
+   ],
+   "setupFiles": [
+     "<rootDir>/config/test/polyfills.js"
+   ]
}

```

- ts-jest configuration:

### ./package.json
```diff
{
  ...
  "jest": {
    "testRegex": "\\.spec\\.tsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx"
    ],
    "setupFiles": [
      "<rootDir>/config/test/polyfills.js"
-   ]
+   ],
+   "transform": {
+     ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
+   }
  }
}

```

## Adding action tests

Let's launch tests in watch mode:

```
npm run test:watch
```

- Adding unit tests support to the `loginRequestCompleted` action. We will implement a simple test, in the implemented sample code you can find a battery of unit tests already implemented.

### ./src/pages/login/actions/loginRequestCompleted.spec.ts
```javascript
import { actionsEnums } from '../../../common/actionsEnums';
import { LoginResponse } from '../../../model/loginResponse';
import { loginRequestCompletedAction } from './loginRequestCompleted';

describe('loginRequestCompletedAction', () => {
  it('should return action with type equals USERPROFILE_PERFORM_LOGIN and payload with values when passing loginResponse equals succeeded: true', () => {
    // Arrange
    const loginResponse = new LoginResponse();
    loginResponse.succeeded = true;
    loginResponse.userProfile = {
      fullname: 'test name',
      role: 'test role',
    };

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeTruthy();
    expect(result.payload.userProfile).toBe(loginResponse.userProfile);
  });

  it('should return action with type equals USERPROFILE_PERFORM_LOGIN and payload with values when passing loginResponse equals succeeded: false', () => {
    // Arrange
    const loginResponse = new LoginResponse();
    loginResponse.succeeded = false;
    loginResponse.userProfile = {
      fullname: 'test name',
      role: 'test role',
    };

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeFalsy();
    expect(result.payload.userProfile).toBe(loginResponse.userProfile);
  });
});

```

## Debugging Jest

Jest is running over node, so we could use VS Code for debugging jest specs:

### Using VS Code

As we know, VS Code provides by default a [node debugger](https://code.visualstudio.com/Docs/editor/debugging):

- Adding debug launch.json in VS Code:

 ![Debug VS Code](../99%20Readme%20Resources/11%20Testing_Jest/00%20Adding%20debug%20launch.json%20in%20VS%20Code.png)

 - Configuring launch.json to single and watchAll runs:

### ./.vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest single run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "--verbose"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest watchAll run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "--watchAll",
        "--verbose",
        "-i"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}

```

![Debugging](../99%20Readme%20Resources/11%20Testing_Jest/02%20Debugging.png)

- Now it's time to go for a case that has a greater level of completexity, we are going to test an async action (thunk) and we will have to mock dependencies (rest api), the action we are going to test is loginRequestStarted.

### ./src/pages/login/actions/loginRequestStarted.spec.ts

```javascript
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
        then: () => { },
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
});

```

### ./src/pages/login/actions/loginRequestStarted.spec.ts

```diff
...
+ it('should call to loginRequestCompletedAction but not hashHistory when passing loginEntity data and expected succeeded equals false response', () => {
+   // Arrange
+   const loginEntity = new LoginEntity();
+   loginEntity.login = 'test login';
+   loginEntity.password = 'test password';

+   const expectedResponse = new LoginResponse();
+   expectedResponse.succeeded = false;

+   loginApi.login = jest.fn(() => {
+     return {
+       then: (callback) => {
+         callback(expectedResponse);
+       },
+     };
+   });

+   hashHistory.push = jest.fn();

+   // Act
+   const store = mockStore();
+   store.dispatch(loginRequestStartedAction(loginEntity))
+     .then(() => {
+       // Assert
+       expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
+       expect(store.getActions()[0].type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
+       expect(store.getActions()[0].payload).toBe(expectedResponse);
+       expect(hashHistory.push).not.toHaveBeenCalled();
+     });
+ });
...

```

### ./src/pages/login/actions/loginRequestStarted.spec.ts

```diff
...
+ it('should call to loginRequestCompletedAction and hashHistory when passing loginEntity data and expected succeeded equals true response', () => {
+   // Arrange
+   const loginEntity = new LoginEntity();
+   loginEntity.login = 'test login';
+   loginEntity.password = 'test password';

+   const expectedResponse = new LoginResponse();
+   expectedResponse.succeeded = true;

+   loginApi.login = jest.fn(() => {
+     return {
+       then: (callback) => {
+         callback(expectedResponse);
+       },
+     };
+   });

+   hashHistory.push = jest.fn();

+   // Act
+   const store = mockStore();
+   store.dispatch(loginRequestStartedAction(loginEntity))
+     .then(() => {
+       // Assert
+       expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
+       expect(store.getActions()[0].type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
+       expect(store.getActions()[0].payload).toBe(expectedResponse);
+       expect(hashHistory.push).toHaveBeenCalledWith('/student-list');
+     });
+ });
...

```

### ./src/pages/login/actions/loginRequestStarted.ts

```diff
import {actionsEnums} from '../../../common/actionsEnums';
import {LoginEntity} from '../../../model/login';
import {loginApi} from '../../../rest-api/loginApi';
import {loginRequestCompletedAction} from './loginRequestCompleted';
import { hashHistory } from 'react-router';

export const loginRequestStartedAction = (login : LoginEntity) => {
  return function(dispatcher) {
    const promise = loginApi.login(login);

    promise.then(
      data => {
        dispatcher(loginRequestCompletedAction(data));

        // This is not ideal to have it here, maybe move it to middleware?
        if(data.succeeded == true) {
          hashHistory.push('/student-list');
        }
      }

-   );
+   )
+   .catch((error) => {
+     console.error(error);
+   });

    return promise;
  }
}

```

### ./src/pages/login/actions/loginRequestStarted.spec.ts

```diff
...

    loginApi.login = jest.fn(() => {
      return {
-       then: () => { },
+       then: function() {
+         return this;
+       },
+       catch: function() {
+         return this;
+       },
      };
    });
...

    loginApi.login = jest.fn(() => {
      return {
-       then: (callback) => {
-         callback(expectedResponse);
-       },
+       then: function(callback) {
+         callback(expectedResponse);
+         return this;
+       },
+       catch: function() {
+         return this;
+       },
      };
    });
...

    loginApi.login = jest.fn(() => {
      return {
-       then: (callback) => {
-         callback(expectedResponse);
-       },
+       then: function(callback) {
+         callback(expectedResponse);
+         return this;
+       },
+       catch: function() {
+         return this;
+       },
      };
    });
...

```

### ./src/pages/login/actions/loginRequestStarted.spec.ts

```diff
...
+ it('should call to catch when passing loginEntity data and server throw any error', () => {
+   // Arrange
+   const loginEntity = new LoginEntity();
+   loginEntity.login = 'test login';
+   loginEntity.password = 'test password';

+   const expectedError = 'test error';

+   loginApi.login = jest.fn(() => {
+     return {
+       then: function() {
+         return this;
+       },
+       catch: function(callback) {
+         callback(expectedError);
+         return this;
+       },
+     };
+   });

+   hashHistory.push = jest.fn();

+   console.error = jest.fn();

+   // Act
+   const store = mockStore();
+   store.dispatch(loginRequestStartedAction(loginEntity))
+     .then(() => {
+       // Assert
+       expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
+       expect(hashHistory.push).not.toHaveBeenCalled();
+       expect(console.error).toHaveBeenCalledWith(expectedError);
+     });
+ });
...
```

## Adding reducer tests

Now let's add a simple test

### ./src/reducers/session.spec.ts

```javascript
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
});

```

### ./src/reducers/session.spec.ts

```diff
...
+ describe('handlePerformLogin', () => {
+   it('should return new immutable state with updated values when passing initial state with default values and action with payload', () => {
+     // Arrange
+     const initialState = {
+       isUserLoggedIn: false,
+       userProfile: new UserProfile(),
+       editingLogin: new LoginEntity(),
+     };

+     const action = {
+       type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
+       payload: {
+         succeeded: true,
+         userProfile: {
+           fullname: 'Jonh Doe',
+           role: 'admin'
+         },
+       } as LoginResponse,
+     };

+     deepFreeze(initialState);

+     // Act
+     const result = sessionReducer(initialState, action);

+     // Assert
+     expect(result.isUserLoggedIn).toBe(action.payload.succeeded);
+     expect(result.userProfile).toBe(action.payload.userProfile);
+   });
+ });
...

```

### ./src/reducers/session.spec.ts

```diff
...
+ describe('handleUpdateEditingLogin', () => {
+   it('should return new immutable state with updated values when passing initial state with default values and action with payload', () => {
+     // Arrange
+     const initialState = {
+       isUserLoggedIn: false,
+       userProfile: new UserProfile(),
+       editingLogin: new LoginEntity(),
+     };

+     const action = {
+       type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
+       payload: {
+         login: 'test login',
+         password: 'test password'
+       } as LoginEntity,
+     };

+     deepFreeze(initialState);

+     // Act
+     const result = sessionReducer(initialState, action);

+     // Assert
+     expect(result.isUserLoggedIn).toBe(initialState.isUserLoggedIn);
+     expect(result.userProfile).toBe(initialState.userProfile);
+     expect(result.editingLogin).toBe(action.payload);
+   });
+ });
...
```

## Adding component tests


- We can work with `jest` and `enzyme` together because `enzyme` makes it easier to assert, manipulate, and traverse your React Components' output.

- Let's create _config/test/setupTest.js_ to configure enzyme adapter:

### config/test/setupTest.js

```js
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
enzyme.configure({ adapter: new Adapter() });

```

- We need to add this file to the `setupFiles` array in _package.json_:

```diff

    "setupFiles": [
-     "<rootDir>/config/test/polyfills.js"
+     "<rootDir>/config/test/polyfills.js",
+     "<rootDir>/config/test/setupTest.js"
    ],
    "transform": {
      ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
-   }
+   },
+   "snapshotSerializers": [
+     "enzyme-to-json/serializer"
+   ]

``` 

- Now let's add a simple test

### ./src/pages/login/components/header.spec.tsx

```jsx
import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('Header', () => {
  it('should render as expected', () => {
    // Arrange

    // Act
    const component = shallow(
      <Header />,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});

```

When we run this test, it creates a snapshot test file:

Note:
> We should include this file in repository so everybody can view this file in PR.

### ./src/pages/login/components/__snapshots__/header.spec.tsx.snap

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Header should render as expected 1`] = `
<div
  className="panel-heading"
>
  <h3
    className="panel-title"
  >
    Please sign in
  </h3>
</div>
`;

```

- Let's continue by adding test to sutendtRow.tsx checking that the row is displaying the expected data:

### ./src/pages/student-list/components/studentRow.spec.tsx

```jsx
import * as React from 'react';
import { shallow } from 'enzyme';
import { StudentEntity } from '../../../model/student';
import { StudentRowComponent } from './studentRow';

describe('StudentRowComponent', () => {
  it('should render as expect passing student with gotActiveTraining equals true', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = 'test name';
    student.email = 'test email';

    const editStudent = () => { };

    // Act
    const component = shallow(
      <StudentRowComponent
        student={student}
        editStudent={editStudent}
      />,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});

```

Snapshot:

### ./src/pages/student-list/components/__snapshots__/studentRow.spec.tsx.snap

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`StudentRowComponent should render as expect passing student with gotActiveTraining equals true 1`] = `
<tr>
  <td>
    <span
      aria-hidden="true"
      className="glyphicon glyphicon-ok"
    />
  </td>
  <td>
    <span>
      test name
    </span>
  </td>
  <td>
    <span>
      test email
    </span>
  </td>
  <td>
    <span
      className="btn btn-link btn-xs"
      onClick={[Function]}
    >
      <span
        aria-hidden="true"
        className="glyphicon glyphicon-pencil"
      />
    </span>
    <span
      aria-hidden="true"
      className="glyphicon glyphicon-trash"
    />
  </td>
</tr>
`;

```

### ./src/pages/student-list/components/studentRow.spec.tsx

```diff
...
+ it('should render as expect passing student with gotActiveTraining equals false', () => {
+   // Arrange
+   const student = new StudentEntity();
+   student.id = 2;
+   student.gotActiveTraining = false;
+   student.fullname = 'test name';
+   student.email = 'test email';

+   const editStudent = () => { };

+   // Act
+   const component = shallow(
+     <StudentRowComponent
+       student={student}
+       editStudent={editStudent}
+     />,
+   );

+   // Assert
+   expect(component).toMatchSnapshot();
+ });
...
```

Snapshot:

### ./src/pages/student-list/components/__snapshots__/studentRow.spec.tsx.snap

```javascript
exports[`StudentRowComponent should render as expect passing student with gotActiveTraining equals false 1`] = `
<tr>
  <td />
  <td>
    <span>
      test name
    </span>
  </td>
  <td>
    <span>
      test email
    </span>
  </td>
  <td>
    <span
      className="btn btn-link btn-xs"
      onClick={[Function]}
    >
      <span
        aria-hidden="true"
        className="glyphicon glyphicon-pencil"
      />
    </span>
    <span
      aria-hidden="true"
      className="glyphicon glyphicon-trash"
    />
  </td>
</tr>
`;
```

- And simulating a click event:

### ./src/pages/student-list/components/studentRow.spec.tsx

```diff
...
+ it('should call to editStudent with studentId as parameter whenclick on button', () => {
+   // Arrange
+   const student = new StudentEntity();
+   student.id = 2;
+   student.gotActiveTraining = false;
+   student.fullname = 'test name';
+   student.email = 'test email';

+   const editStudent = jest.fn();

+   // Act
+   const component = shallow(
+     <StudentRowComponent
+       student={student}
+       editStudent={editStudent}
+     />,
+   );

+   component.find('span.btn').simulate('click');

+   // Assert
+   expect(editStudent).toHaveBeenCalled();
+   expect(editStudent).toHaveBeenCalledWith(student.id);
+ });

```

- Testing `Containers`:

### ./src/pages/login/loginContainer.spec.tsx
```jsx
import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

import { LoginEntity } from '../../model/login';
import { LoginContainer } from './loginContainer';

describe('LoginContainer', () => {
  it('should render a LoginComponent with loginInfo property informed', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = 'test login';
    loginInfo.password = 'test password';

    const store = mockStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const component = mount(
      <Provider store={store}>
        <LoginContainer />
      </Provider>,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});

```

### ./src/pages/login/loginContainer.spec.tsx

```diff
...
import { LoginEntity } from '../../model/login';
import { LoginContainer } from './loginContainer';
+ import * as updateEditingLoginActions from './actions/updateEditingLogin';
...

+ it('should call to updateEditingLogin when simulate onChange email', () => {
+   // Arrange
+   const loginInfo = new LoginEntity();
+   loginInfo.login = 'test login';
+   loginInfo.password = 'test password';

+   const store = mockStore({
+     sessionReducer: {
+       editingLogin: loginInfo,
+     },
+   });

+   const updateEditingLoginMock = jest.spyOn(updateEditingLoginActions, 'updateEditingLogin');
+   updateEditingLoginMock.mockImplementation(() => ({
+     type: 'dummy',
+   }));

+   // Act
+   const component = mount(
+     <Provider store={store}>
+       <LoginContainer />
+     </Provider>,
+   );

+   component.find('input [name="email"]').simulate('change');

+   // Assert
+   expect(updateEditingLoginMock).toHaveBeenCalled();
+   expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
+ });
...

```

### ./src/pages/login/loginContainer.spec.tsx

```diff
...

+ it('should call to updateEditingLogin when simulate onChange password', () => {
+   // Arrange
+   const loginInfo = new LoginEntity();
+   loginInfo.login = 'test login';
+   loginInfo.password = 'test password';

+   const store = mockStore({
+     sessionReducer: {
+       editingLogin: loginInfo,
+     },
+   });

+   const updateEditingLoginMock = jest.spyOn(updateEditingLoginActions, 'updateEditingLogin');
+   updateEditingLoginMock.mockImplementation(() => ({
+     type: 'dummy',
+   }));

+   // Act
+   const component = mount(
+     <Provider store={store}>
+       <LoginContainer />
+     </Provider>,
+   );

+   component.find('input [name="password"]').simulate('change');

+   // Assert
+   expect(updateEditingLoginMock).toHaveBeenCalled();
+   expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
+ });
...

```

### ./src/pages/login/loginContainer.spec.tsx

```diff
...

import { LoginEntity } from '../../model/login';
import { LoginContainer } from './loginContainer';
import * as updateEditingLoginActions from './actions/updateEditingLogin';
+ import * as loginRequestActions from './actions/loginRequestStarted';
...

+ it('should call to loginRequestStartedAction when simulate button click', () => {
+   // Arrange
+   const loginInfo = new LoginEntity();
+   loginInfo.login = 'test login';
+   loginInfo.password = 'test password';

+   const store = mockStore({
+     sessionReducer: {
+       editingLogin: loginInfo,
+     },
+   });

+   const loginRequestStartedActionMock = jest.spyOn(loginRequestActions, 'loginRequestStartedAction');
+   loginRequestStartedActionMock.mockImplementation(() => ({
+     type: 'dummy',
+   }));

+   // Act
+   const component = mount(
+     <Provider store={store}>
+       <LoginContainer />
+     </Provider>,
+   );

+   component.find('input [type="button"]').simulate('click');

+   // Assert
+   expect(loginRequestStartedActionMock).toHaveBeenCalled();
+ });

...

```

## Testing components with CSS Modules

The advantage using CSS Modules in components is that we have an unique identifier for class name. But we need to avoid that for testing.

- Update webpack config for add CSS Modules:

### ./webpack.config.js

```diff
...
  {
    test: /\.css$/,
    include: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: {
        loader: 'css-loader',
      },
    }),
  },
+ {
+   test: /\.css$/,
+   exclude: /node_modules/,
+   loader: ExtractTextPlugin.extract({
+     fallback: 'style-loader',
+     use: {
+       loader: 'css-loader',
+       options: {
+         modules: true,
+         camelCase: true,
+         localIdentName: '[name]__[local]___[hash:base64:5]',
+       },
+     },
+   }),
+ },
...

```

### ./src/pages/login/components/header.css

```css
.header {
  background-color: #5cb85c!important;
  color: white!important;
  padding: 20px;
}

```

### ./src/pages/login/components/header.tsx

```diff
import * as React from "react";
+ const styles = require('./header.css');

export const Header = () => {
	return (
-		<div className="panel-heading">
+ 	<div className={`panel-heading ${styles.header}`}>
			<h3 className="panel-title">Please sign in</h3>
		</div>
	);
}

```

- If we running `npm run test:watch`, we find some erros. Thats why we need install [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy):

```bash
npm install identity-obj-proxy --save-dev

```

### ./package.json

```diff
...
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
-   ]
+   ],
+   "moduleNameMapper": {
+     "^.+\\.s?css$": "identity-obj-proxy"
+   }

```

- We need to press `u` jest option to update the snapshot:

### ./src/pages/login/components/__snapshots__/header.spec.tsx.snap

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Header should render as expected 1`] = `
<div
  className="panel-heading header"
>
  <h3
    className="panel-title"
  >
    Please sign in
  </h3>
</div>
`;

```

## Code Coverage configuration

### ./package.json
```diff
{
  ...
  "scripts": {
    ...
    "test": "jest --verbose",
-   "test:watch": "jest --watchAll --verbose -i"
+   "test:watch": "jest --watchAll --verbose -i",
+   "test:coverage": "jest --verbose --coverage"
  }
  ...
}

```

- Execute `npm test:coverage` to single run test with coverage.

## Resources
- [Migrating to Jest](https://facebook.github.io/jest/docs/migration-guide.html)
