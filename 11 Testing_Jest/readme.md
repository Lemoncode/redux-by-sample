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
import {actionsEnums} from '../../../../common/actionsEnums';
import {LoginResponse} from '../../../../model/loginResponse';
import {UserProfile} from '../../../../model/userProfile';
import {loginRequestCompletedAction} from '../loginRequestCompleted';

describe('loginRequestCompletedAction', () => {
  it('When passing loginResponse equals {succeeded: true}' +
  'Should return action { type: USERPROFILE_PERFORM_LOGIN, payload: {succeeded: true} }', () => {
    // Arrange
    const loginResponse = new LoginResponse();
    loginResponse.succeeded = true;

    // Act
    const result = loginRequestCompletedAction(loginResponse);

    // Assert
    expect(result.type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
    expect(result.payload.succeeded).toBeTruthy();
  });
});

```

- Now it's time to go for a case that has a greater level of completexity, we are going to test an async action (thunk) and we will have to mock dependencies (rest api), the action we are going to test is loginRequestStarted.

### ./src/pages/login/actions/specs/loginRequestStarted.spec.ts
```javascript
import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);
import {hashHistory} from 'react-router';

import {loginRequestStartedAction} from '../loginRequestStarted';
import {loginRequestCompletedAction} from '../loginRequestCompleted';
import {loginApi} from '../../../../rest-api/loginApi';
import {actionsEnums} from '../../../../common/actionsEnums';
import {LoginEntity} from '../../../../model/login';
import {LoginResponse} from '../../../../model/loginResponse';

describe('loginRequestStartedAction', () => {
  it('When passing loginEntity.login equals "test login" and expected LoginResponse.succeeded equals true ' +
  'Should calls loginApi.login(loginEntity), hashHistory.push and dispatch loginRequestCompletedAction action', () => {
    // Arrange
    const loginEntity = new LoginEntity();
    loginEntity.login = "test login";

    const expectedData = new LoginResponse();
    expectedData.succeeded = true;

    loginApi.login = jest.fn(() => {
      return  {
        then: callback => {
          callback(expectedData);
        }
      };
    });

    hashHistory.push = jest.fn();

    // Act
    const store = mockStore([]);

    store.dispatch(loginRequestStartedAction(loginEntity))
      .then((data) => {
        // Assert
        expect(loginApi.login).toHaveBeenCalledWith(loginEntity);
        expect(data).toBe(expectedData);
        expect(store.getActions()[0].type).toBe(actionsEnums.USERPROFILE_PERFORM_LOGIN);
        expect(store.getActions()[0].payload).toBe(expectedData);
        expect(hashHistory.push).toHaveBeenCalledWith('/student-list');
      });
  });
});

```

## Adding reducer tests

Now let's add a simple test

### ./src/reducers/specs/session.spec.ts

```javascript
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
```

## Adding component tests

- Now let's add a simple test

### ./src/pages/login/components/specs/header.spec.tsx

```jsx
import * as React from 'react';
import { create } from 'react-test-renderer';
import { Header } from '../header';

describe('Header', () => {
  it('renders as expected', () => {
    // Arrange

    // Act
    const component = create(
      <Header />
    ).toJSON();

    // Assert
    expect(component).toMatchSnapshot();
  });
});

```

When we run this test, it creates a snapshot test file:

Note:
> We should include this file in repository so everybody can view this file in PR.

### ./src/pages/login/components/specs/__snapshots__/header.spec.tsx.snap

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Header #render renders as expected 1`] = `
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

### ./src/pages/student-list/components/specs/studentRow.spec.tsx

```jsx
import * as React from 'react';
import {create} from 'react-test-renderer';
import { StudentEntity } from '../../../../model/student';
import {StudentRowComponent} from '../studentRow';

describe('StudentRowComponent', () => {
  it('Should render a row with a given name and email', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = "John Doe";
    student.email = "john@email.com";

    // Act
    const component = create(
      <StudentRowComponent
        student={student}
        editStudent={() => {}}
      />
    ).toJSON();

    // Assert
    expect(component).toMatchSnapshot();
  });
});

```

Snapshot:

### ./src/pages/student-list/components/specs/__snapshots__/studentRow.spec.tsx.snap

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`StudentRowComponent Should render a row with a given name and email 1`] = `
<tr>
  <td>
    <span
      aria-hidden="true"
      className="glyphicon glyphicon-ok"
    />
  </td>
  <td>
    <span>
      John Doe
    </span>
  </td>
  <td>
    <span>
      john@email.com
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
### ./src/pages/student-list/components/specs/studentRow.spec.tsx

```diff
- import {create} from 'react-test-renderer';
+ import {create, ReactTestRendererJSON} from 'react-test-renderer';
...

+ it('Should interact to the click on edit student and returns as param 2 student Id', () => {
+   //Arrange
+   const student = new StudentEntity();
+   student.id = 2;
+   student.gotActiveTraining = true;
+   student.fullname = "John Doe";
+   student.email = "john@email.com";

+   const onEditStudentMock = jest.fn();

+   //Act
+   const component = create(
+     <StudentRowComponent
+       student={student}
+       editStudent={onEditStudentMock}
+      />
+   ).toJSON();

+   const tdContainingButton = component.children[3] as ReactTestRendererJSON;
+   const button = tdContainingButton.children[0];

+   button.props.onClick();

+   //Assert
+   expect(component).toMatchSnapshot();
+   expect(onEditStudentMock).toHaveBeenCalled();
+   expect(onEditStudentMock).toHaveBeenCalledWith(student.id);
+ });

```

Snapshot:

### ./src/pages/student-list/components/specs/__snapshots__/studentRow.spec.tsx.snap

```diff
+ exports[`StudentRowComponent Should interact to the click on edit student and returns as param 2 student Id 1`] = `
+ <tr>
+   <td>
+     <span
+       aria-hidden="true"
+       className="glyphicon glyphicon-ok"
+     />
+   </td>
+   <td>
+     <span>
+       John Doe
+     </span>
+   </td>
+   <td>
+     <span>
+       john@email.com
+     </span>
+   </td>
+   <td>
+     <span
+       className="btn btn-link btn-xs"
+       onClick={[Function]}
+     >
+       <span
+         aria-hidden="true"
+         className="glyphicon glyphicon-pencil"
+       />
+     </span>
+     <span
+       aria-hidden="true"
+       className="glyphicon glyphicon-trash"
+     />
+   </td>
+ </tr>
+ `;

```

- We can work with `jest` and `enzyme` together because `enzyme` makes it easier to assert, manipulate, and traverse your React Components' output:

```
npm install enzyme @types/enzyme enzyme-adapter-react-16 --save-dev
```

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
  ],
-   "setupFiles": ["<rootDir>/config/test/polyfills.js"],
+   "setupFiles": ["<rootDir>/config/test/polyfills.js", "<rootDir>/config/test/setupTest.js"],
    "transform": {
      ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  }
```

- Testing `Containers`:

### ./src/pages/login/specs/loginContainer.spec.tsx
```jsx
import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LoginEntity } from '../../../model/login';
import * as loginRequestActions from '../actions/loginRequestStarted';
import * as updateLoginActions from '../actions/updateEditingLogin';
import {LoginComponent} from '../login';
import {LoginContainer} from '../loginContainer';

const createStore = configureStore();

describe('LoginContainer', () => {
  it('Should render LoginComponent with loginInfo', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    // Assert
    expect(loginComponentWrapper).toBeDefined();
    expect(loginComponentWrapper.prop('loginInfo')).toBeDefined();
    expect(loginComponentWrapper.prop('loginInfo').login).toEqual(loginInfo.login);
    expect(loginComponentWrapper.prop('loginInfo').password).toEqual(loginInfo.password);
  });

  it('Should calls to updateEditingLogin when simulate onChange email', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const updateEditingLoginMock = jest.spyOn(updateLoginActions, 'updateEditingLogin');
    updateEditingLoginMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const inputEmail = loginComponentWrapper.find('.form-control').find('[name="email"]');
    inputEmail.simulate('change');

    // Assert
    expect(updateEditingLoginMock).toHaveBeenCalled();
    expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
  });

  it('Should calls to updateEditingLogin when simulate onChange password', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const updateEditingLoginMock = jest.spyOn(updateLoginActions, 'updateEditingLogin');
    updateEditingLoginMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const inputPassword = loginComponentWrapper.find('.form-control').find('[name="password"]');
    inputPassword.simulate('change');

    // Assert
    expect(updateEditingLoginMock).toHaveBeenCalled();
    expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
  });

  it('Should calls to loginRequestStartedAction when simulate button click', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const loginRequestStartedMock = jest.spyOn(loginRequestActions, 'loginRequestStartedAction');
    loginRequestStartedMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const loginButton = loginComponentWrapper.find('input[type="button"]');
    loginButton.simulate('click');

    // Assert
    expect(loginRequestStartedMock).toHaveBeenCalled();
    expect(loginRequestStartedMock).toHaveBeenCalledWith(loginInfo);
  });
});

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

## Debugging Jest

Jest is running over node, so we can't use, for example, PhantomJS like we are using in karma.
Then, we have some alternatives to debugging jest:

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
      "console": "integratedTerminal"
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
      "console": "integratedTerminal"
    }
  ]
}

```

- Run `npm run test:watch`.

- Run VS Code debugger, selecting watch process:

![Select watch process to debug](../99%20Readme%20Resources/11%20Testing_Jest/01%20Select%20watch%20process%20to%20debug.png)

- Now, it's important to put the special key `debugger` in our spec.ts (only for debugging, then remove it):

![Debugging](../99%20Readme%20Resources/11%20Testing_Jest/02%20Debugging.png)


## Resources
- [Migrating to Jest](https://facebook.github.io/jest/docs/migration-guide.html)
