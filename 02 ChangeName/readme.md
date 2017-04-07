# 02 Change Name

This sample takes as starting point _01 helloRedux_

In this sample we will add a component that will let us change the name of the
user.

Summary steps:

- Install object assign polyfill library plus typescript definition.
- Let's create an _app_ component and instantiate in main.tsx
- Create a nameEdit presentational component.
- Create an action const file.
- Create an action dispatcher to get the name updated.
- Handle this action in the reducer.
- Create a nameEditContainer component to wire it up.
- Let's instantiate nameEditContainer.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 Hello Redux_ and execute _npm install_.

- Let's configure to transpile TypeScript -> ES6 -> Babel -> ES5. We can start installing `babel`:

```
npm install babel-core babel-preset-env --save-dev
```

- Add `babel` configuration file:

### ./.babelrc
```javascript
{
  "presets": [
    "env",
  ]
}
```

- Configure `webpack.config.js`:

### ./webpack.config.js
```diff
...
rules: [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
-   loader: 'awesome-typescript-loader',
+   use: {
+     loader: 'awesome-typescript-loader',
+     options: {
+       useBabel: true,
+     },
+   },
  },
...
```

- Finally, configure `tsconfig.json`:

### ./tsconfig.json
```diff
{
  "compilerOptions": {
-   "target": "es5",
+   "target": "es6",
-   "module": "commonjs",
+   "module": "es6",
+   "moduleResolution": "node",
    ...
}

```

- Create a nameEdit presentational component. In `src/nameEdit.tsx`:

```javascript
import * as React from 'react';

export const NameEditComponent = (props: {userName : string, onChange : (name : string) => any}) => {
  return (
    <div>
      <label>Update Name:</label>
      <input
        value={props.userName}
        onChange={(e : any) => props.onChange(e.target.value)}
        />
    </div>
  );
}
```

- Create an action const file, let's create them under the following
fullpath _./src/common/actionEnum.ts_.

```javascript
export const actionsEnums = {
  UPDATE_USERPROFILE_NAME : 'UPDATE_USERPROFILE_NAME '
}
```

- Create an action dispatcher to get the name updated, full path:
_./src/actions/updateUserProfileName.ts_.

```
import {actionsEnums} from "../common/actionsEnums";

export const updateUserProfileName = (newName : string) => {
   return {
     type: actionsEnums.UPDATE_USERPROFILE_NAME
     ,newName : newName
   }
}
```

- Handle this action in the reducer, `./src/reducers/userProfile.tsx`_. (Rename old _userProfile.ts_)

```javascript
import {actionsEnums} from '../common/actionsEnums';
import {updateUserProfileName} from '../actions/updateUserProfileName';
import objectAssign = require('object-assign');

class userProfileState  {
  firstname : string;

  public constructor()
  {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : userProfileState = new userProfileState(), action) => {
      switch (action.type) {
        case actionsEnums.UPDATE_USERPROFILE_NAME:
           return handleUserProfileAction(state, action);        
      }

      return state;
};

const handleUserProfileAction = (state : userProfileState, action) => {
  const newState = objectAssign({}, state, {firstname: action.newName});
  return newState;
}
```

- Create a nameEditContainer component to wire it up. In `src/nameEditContainer.tsx`:

```javascript
import { connect } from 'react-redux';
import { NameEditComponent } from './nameEdit';
import {updateUserProfileName} from './actions/updateUserProfileName';

const mapStateToProps = (state) => {
    return {
      userName: state.userProfileReducer.firstname
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name : string) => {return dispatch(updateUserProfileName(name))}
  }
}

export const HelloWorldContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(NameEditComponent);
```

- Let's create an _app_ component in `src/app.tsx`

```
import * as React from 'react';
import {HelloWorldContainer} from './helloWorldContainer';
import {NameEditContainer} from './nameEditContainer';

export const App = () => {
  return (
    <div>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
    </div>
  );
}
```
And instantiate it in `main.tsx`
```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers'
import {App} from './app';

let store = createStore(reducers);

ReactDOM.render(
   <Provider store={store}>
    <App/>
   </Provider>
  , document.getElementById('root'));
```

- Let's test the sample:

```
npm start
```
