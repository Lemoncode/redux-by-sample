# 06 Simple App

This sample takes as starting point _02 Change Name_

In this sample we will create a minimal application, that will include
a login page, a list like and a detail page.

We will be using react router redux, and in a later sample we will check
how this integrates with redux dev tools.

We will create the app following an ellaborated structure, this could be an
overkill if we just want to implement such simple app, but the goal is to
simulate a complex scenario, a mid size app.


Summary steps:

- First let's make some cleanup.
- We will continue by installing react-router-redux.
- Let's create basic pages and navigation.
- Let's create a loginEntity, and a userProfile entity.
- Let's add a fake API to simulate a login (_loginApi.tsx_).
- Let's implement our login functionallity.
- Time to move to members lists (Model, API, Action, Reducer, ...).
- Time to move to details views.
- Let's add validations to details view.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _02 Change Name_ and execute _npm install_.

- Let's make some cleanup:
    - Remove the _./src/helloworld.tsx_ and _./src/helloworldContainer.tsx_.
    - Remove the _./src/nameEdit.tsx_ and _./src/nameEditContainer.tsx_.
    - Remove the _./actions/updateUserProfileName.tsx plus _./actions_ folder.

- It's time to install routing libraries:

```
npm install react-router react-router-redux --save
```

```
npm install @types/react-router @types/react-router-redux --save
```

- Let's start working with the pages structure, create the following folder _./src/pages_

- Under pages let's create a subfolder called _./src/pages/login_.

- Let's create under _./src/pages/login/login.tsx_

```javascript
import * as React from 'react';

export const LoginComponent = () => {
  return (
    <h2>Im the login page</h2>
  )
}
```

- Let's create under _./src/pages/login/loginContainer.tsx_

```javascript
import { connect } from 'react-redux';
import { LoginComponent } from './login';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const LoginContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(loginComponent);
```


- Let's create under _./src/pages/login/index.tsx_

```javascript
import { connect } from 'react-redux';
import { LoginComponent } from './login';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const LoginContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(loginComponent);
```

- Let's follow the same steps to create under _./src/pages/student-list
the folowing files:

studentList.tsx

```javascript
import * as React from 'react';

export const StudentListComponent = () => {
  return (
    <h2>I'm the StudentList page</h2>
  )
}
```

studentListContainer.tsx

```javascript
import { connect } from 'react-redux';
import { StudentListComponent } from './studentList';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const StudentListContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentListComponent);
```


index.tsx

```javascript
import {StudentListContainer} from './studentListContainer';

export {
  StudentListContainer
}
```

- Let's follow the same steps to create under _./src/pages/student-detail
the folowing files:

studentDetail.tsx

```javascript
```

studentDetailContainer.tsx

```javascript
import { connect } from 'react-redux';
import { StudentDetailComponent } from './studentDetail';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const StudentDetailContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentDetailComponent);
```


index.tsx

```javascript
import {StudentDetailContainer} from './studentDetailContainer';

export {
  StudentDetailContainer
}
```

- Is time to wire up the navigation, let's start by adding _routerReducre_
into ./reducers/index.ts

```
import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux'

export const reducers =  combineReducers({
  userProfileReducer,
  routing: routerReducer
});
```

- Let's move to _./src/main.tsx_ and add the routing support (pending to separate
  this routing in a separate file).

  ```javascript
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import { Router, Route, IndexRoute, browserHistory } from 'react-router'
  import { syncHistoryWithStore} from 'react-router-redux'
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import {reducers} from './reducers'
  import {App} from './app';
  import {LoginContainer} from './pages/login';
  import {StudentListContainer} from './pages/student-list';
  import {StudentDetailContainer} from './pages/student-detail';

  let store = createStore(reducers);
  const history = syncHistoryWithStore(browserHistory, store)

  ReactDOM.render(
     <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={LoginContainer}/>
              <Route path="login" component={LoginContainer}/>
              <Route path="student-list" component={StudentListContainer}/>
              <Route path="student-detail" component={StudentDetailContainer}/>
            </Route>
          </Router>
        </div>
     </Provider>
    , document.getElementById('root'));
  ```

- Time to update _app.tsx_ to place the page container.

```javascript

```


- Let's create basic pages and navigation.
- Let's create a loginEntity, and a userProfile entity.
- Let's add a fake API to simulate a login (_loginApi.tsx_).
- Let's implement our login functionallity.
- Time to move to members lists (Model, API, Action, Reducer, ...).
- Time to move to details views.
- Let's add validations to details view.
