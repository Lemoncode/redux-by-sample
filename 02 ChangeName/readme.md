# 02 Change Name

This sample takes as starting point _01 helloRedux_

In this sample we will add a component that will let us change the name of the
user.

Summary steps:

- Create a nameEdit presentational component.
- Create an action const file.
- Create an action creator to get the name updated.
- Handle this action in the reducer.
- Create a nameEditContainer component to wire it up.
- Let's create an _app_ component and instantiate in `main.tsx`

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (>=v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Create a nameEdit presentational component. In `src/nameEdit.tsx`:

_./src/components/nameEdit/nameEdit.tsx_

```javascript
import * as React from 'react';

interface Props {
  userName : string;
  onChange : (name : string) => void;
}

export const NameEditComponent = (props: Props) => {
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
fullpath `./src/common/actionsEnums.ts`.

_./src/common/actionsEnums.ts_
```javascript
export const actionsEnums = {
  UPDATE_USERPROFILE_NAME : 'UPDATE_USERPROFILE_NAME '
}
```

- Create an action dispatcher to get the name updated, full path:
`./src/actions/updateUserProfileName.ts`.

_./src/actions/updateUserProfileName.ts_

```javascript
import {actionsEnums} from '../common/actionsEnums';

export const updateUserProfileName = (newName : string) => ({  
    type: actionsEnums.UPDATE_USERPROFILE_NAME,
    newName : newName,  
});
```

- Handle this action in the `userProfile` reducer.

_./src/reducers/userProfile.ts_

```diff
+ import {actionsEnums} from '../common/actionsEnums';

class UserProfileState {
  firstname : string;

  constructor() {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : UserProfileState = new UserProfileState(), action) => {
+ switch (action.type) {
+   case actionsEnums.UPDATE_USERPROFILE_NAME:
+     return handleUserProfileAction(state, action);
+ }
+
  return state;
};

+ const handleUserProfileAction = (state : UserProfileState, action) => {
+   return {
+     ...state,
+     firstname: action.newName,
+   };
+ }

```

- Create a nameEditContainer component to wire it up. In `src/components/nameEdit/nameEditContainer.tsx`:

_./src/components/nameEdit/nameEditContainer.tsx_

```javascript
import { connect } from 'react-redux';
import { NameEditComponent } from './nameEdit';
import {updateUserProfileName} from '../../actions/updateUserProfilename';
import { State } from '../../reducers'

const mapStateToProps = (state : State) => {
  return {
    userName: state.userProfileReducer.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (name : string) => dispatch(updateUserProfileName(name))
  }
}

export const NameEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEditComponent);
```

- Let's expose NameEditContainer via an index.ts

_./src/components/nameEdit/index.ts_

```javascript
+ export {NameEditContainer} from './nameEdit/nameEditContainer';
```


- Let's create an _app_ component in `src/app.tsx`

### ./src/app.tsx
```javascript
import * as React from 'react';
import {HelloWorldContainer, NameEditContainer} from './components';

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
And instantiate it in `main.tsx`:

### ./src/main.tsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers'
- import {HelloWorldContainer} from './helloWorldContainer';
+ import {App} from './app';

let store = createStore(reducers);

ReactDOM.render(
   <Provider store={store}>
-     <HelloWorldContainer/>
+     <App/>
   </Provider>,
   document.getElementById('root'));

```

- Let's test the sample:

```
npm start
```

- Thas was cool the sample is working, but where is all the benefit of using redux... let's 
add redux dev tool support.

You can install redux dev tool as a chrome plugin.

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es

And to enable it in our code:

_./src/main.tsx_

```diff
+ const nonTypedWindow : any = window;
- const store = createStore(reducers);
+ const store = createStore(reducers,
+                           nonTypedWindow.__REDUX_DEVTOOLS_EXTENSION__ && nonTypedWindow.__REDUX_DEVTOOLS_EXTENSION__()
+ );

```

More info about how this works:

https://github.com/zalmoxisus/redux-devtools-extension


