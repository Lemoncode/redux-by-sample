# 06 Simple App

This sample series takes as starting point _02 Change Name_

In this sample we will create a minimal application, that will include
a login page, a list like and a detail page. In this sample we will
create the project structure plus the login page functinallity.

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
    - Remove the _./src/actions/updateUserProfileName.tsx plus _./actions_ folder.
    - Remove _./src/reducers/userProfile.ts_

- And update `reducers` file:

### ./src/reducers/index.ts

```diff
import { combineReducers } from 'redux';
- import { userProfileReducer } from './userProfile';

export const reducers = combineReducers({
- userProfileReducer
});

```

- It's time to install routing libraries:

```bash
npm install react-router-dom --save
```

```bash
npm install @types/react-router-dom --save-dev
```

- Let's install support for promises:

```bash
npm install babel-polyfill --save
```

- Let's install Redux-Thunk to handle async actions, it has own typings:

```bash
npm install redux-thunk --save
```

- Install `sass`:

```bash
npm install sass-loader node-sass --save-dev
```

- Last step to configure libs is update `webpack.config`:

### ./webpack.config.js

```diff
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

- entry: [
-   './main.tsx',
-   '../node_modules/bootstrap/dist/css/bootstrap.css'
- ],
+ entry: {
+   app: './main.tsx',
+   vendor: [
+     'babel-polyfill',
+     'react',
+     'react-dom',
+     'react-redux',
+     'react-router-dom',
+     'redux',
+     'redux-thunk',
+   ],
+   vendorStyles: [
+     '../node_modules/bootstrap/dist/css/bootstrap.css'
+   ],
+ },
  output: {
    path: path.join(basePath, 'dist'),
-   filename: 'bundle.js'
+   filename: '[name].js',
  },

  devtool: 'source-map',

  devServer: {
    contentBase: './dist', // Content base
    inline: true, // Enable watch and live reload
    host: 'localhost',
    port: 8080,
    stats: 'errors-only'
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
          },
        },
      },
+     {
+       test: /\.scss$/,
+       exclude: /node_modules/,
+       loader: ExtractTextPlugin.extract({
+         fallback: 'style-loader',
+         use: [
+           {
+             loader: 'css-loader',
+             options: {
+               modules: true,
+               localIdentName: '[name]__[local]___[hash:base64:5]',
+               camelCase: true,
+             },
+           },
+           { loader: 'sass-loader', },
+         ],
+       }),
+     },
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
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
    ]
  },
  plugins: [
    // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: 'index.html', // Name of template in ./src
      hash: true
    }),
    new ExtractTextPlugin({
-     filename: '[chunkhash].[name].css',
+     filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
+   new webpack.optimize.CommonsChunkPlugin({
+     names: ['vendor', 'manifest'],
+   }),
  ]
}

```

- Let's configure `store` with redux-thunk:

### ./src/store.ts

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { reducers } from './reducers';

const middlewares = [
  reduxThunk,
];

const composeEnhancers = (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

```

- Let's use the `store` in `main.tsx`:

### ./src/main.tsx

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import { createStore } from 'redux';
import { Provider } from 'react-redux';
- import {reducers} from './reducers'
+ import { store } from './store';
import {App} from './app';

- let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

```

- Let's start working with the pages structure, create the following folder _./src/pages_

- Under pages let's create a subfolder called _./src/pages/login_.

- Let's create under _./src/pages/login/login.tsx_

### ./src/pages/login/login.tsx

```javascript
import * as React from 'react';

export const LoginComponent = () => {
  return (
    <h2>Im the login page</h2>
  )
}
```

- Let's create under _./src/pages/login/loginContainer.tsx_

### ./src/pages/login/loginContainer.tsx

```javascript
import { connect } from 'react-redux';
import { LoginComponent } from './login';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);

```

- Let's create under _./src/pages/login/index.ts_

### ./src/pages/login/index.ts

```javascript
export { LoginContainer } from './loginContainer';

```

- Let's follow the same steps to create under _./src/pages/student-list
the folowing files:

### ./src/pages/student-list/studentList.tsx

```javascript
import * as React from 'react';

export const StudentListComponent = () => {
  return (
    <h2>I'm the StudentList page</h2>
  )
}

```

### ./src/pages/student-list/studentListContainer.tsx

```javascript
import { connect } from 'react-redux';
import { StudentListComponent } from './studentList';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentListComponent);

```

### ./src/pages/student-list/index.ts

```javascript
export { StudentListContainer } from './studentListContainer';

```

- Let's follow the same steps to create under _./src/pages/student-detail
the folowing files:

### ./src/pages/student-detail/studentDetail.tsx

```javascript
import * as React from 'react';

export const StudentDetailComponent = () => {
  return (
    <h2>I'm the StudentDetail page</h2>
  )
}

```

### ./src/pages/student-detail/studentDetailContainer.tsx

```javascript
import { connect } from 'react-redux';
import { StudentDetailComponent } from './studentDetail';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export const StudentDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentDetailComponent);

```

### ./src/pages/student-detail/index.ts

```javascript
export { StudentDetailContainer } from './studentDetailContainer';

```

- We could create now a file where we are going to declare all `appRoutes`.

### ./src/appRoutes.tsx

```javascript
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { App } from './app';
import { LoginContainer } from './pages/login';
import { StudentListContainer } from './pages/student-list';
import { StudentDetailContainer } from './pages/student-detail';

export const AppRoutes: React.StatelessComponent = (props) => (
  <App>
    <Switch>
      <Route exact={true} path="/" component={LoginContainer} />
      <Route path="/student-list" component={StudentListContainer} />
      <Route path="/student-detail" component={StudentDetailContainer} />
    </Switch>
  </App>
);

```

- Time to update _app.tsx_ to place the page container.

### ./src/app.tsx

```diff
import * as React from 'react';
- import {HelloWorldContainer} from './helloWorldContainer';
- import {NameEditContainer} from './nameEditContainer';

- export const App = () => {
+ export const App: React.StatelessComponent = (props) => {
  return (
    <div>
-     <HelloWorldContainer/>
-     <br/>
-     <NameEditContainer/>
+     {props.children}
    </div>
  );
}

```

- Finally, we have to use `appRoutes` in `main.tsx`. We have 2 ways of create `Router`, first one is using `HashRouter` and second one is using `Router` and create new instance of `history`. We are going to use the second one because we need to `navigate` programatically from `actions`:

### ./src/history.ts

```javascript
import createHistory from 'history/createHashHistory';

export const history = createHistory();

```

### ./src/main.tsx

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
- import { App } from './app';
+ import { Router } from 'react-router-dom';
+ import { history } from './history';
+ import { AppRoutes } from './appRoutes';

ReactDOM.render(
  <Provider store={store}>
-   <App />
+    <Router history={history}>
+     <AppRoutes />
+   </Router>
  </Provider>,
  document.getElementById('root'));

```

- Let's create a header with `Links`:

### ./src/appStyles.scss

```scss
.header {
  display: flex;
  & > * {
    margin-right: 10px;
  }
}

```

### ./src/app.tsx

```diff
import * as React from 'react';
+ import { Link } from 'react-router-dom';
+ const styles = require('./appStyles.scss');

export const App: React.StatelessComponent = (props) => {
  return (
    <div>
-     {props.children}
+     <header className={styles.header}>
+       <Link to="/">Login</Link>
+       <Link to="/student-list">Student List</Link>
+       <Link to="/student-detail">Student Detail</Link>
+     </header>
+     <div>
+       {props.children}
+     </div>
     </div>
  );
}

```

- Let's create a loginEntity, under _./src/model_

### ./src/model/login.ts

```javascript
export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

```

- And a userProfile entity.

### ./src/model/userProfile.ts

```javascript
export interface UserProfile {
  fullname: string;
  role: string;
}

export const createEmptyUserProfile = (): UserProfile => ({
  fullname: '',
  role: '',
});

```

- A loginResponse:

### ./src/model/loginResponse.ts

```javascript
import { UserProfile, createEmptyUserProfile } from './userProfile';

export interface LoginResponse {
  succeeded: boolean;
  userProfile: UserProfile;
}

export const createEmptyLoginResponse = (): LoginResponse => ({
  succeeded: false,
  userProfile: createEmptyUserProfile(),
});

```

- And the `index` file:

```javascript
export * from './login';
export * from './loginResponse';
export * from './userProfile';

```

- Let's add a fake API to simulate a login:

# ./src/rest-api/loginApi.ts

```javascript
import { LoginEntity, LoginResponse, createEmptyLoginResponse } from "../model";

export const login = (loginEntity: LoginEntity): Promise<LoginResponse> => {
  const loginResponse = createEmptyLoginResponse();

  if (loginEntity.login === 'admin' && loginEntity.password === 'test') {
    loginResponse.succeeded = true;
    loginResponse.userProfile = {
      fullname: 'John Doe',
      role: 'admin',
    };
  }

  return Promise.resolve(loginResponse);
}

```

- Let's get started implementing our login functionallity, first we will define a perform login action:

### ./src/common/actionsEnums.ts

```diff
export const actionsEnums = {  
-  UPDATE_USERPROFILE_NAME: 'UPDATE_USERPROFILE_NAME '
+  USERPROFILE_PERFORM_LOGIN: 'USERPROFILE_PERFORM_LOGIN'
}

```

- Login action will be asynchronous (we need to break it into two actions and use   redux-thunk), we will create two actions _loginRequestStarted_ and _loginRequestCompleted_.

- Let's go for the completed 

###./src/pages/login/actions/loginRequest.ts

```javascript
import { actionsEnums } from '../../../common/actionsEnums';
import { LoginResponse } from '../../../model';

const loginRequestCompletedAction = (loginResponse: LoginResponse) => ({
  type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
  payload: loginResponse,
});

```

- Next step is create the `loginRequestStartedAction`:

###./src/pages/login/actions/loginRequest.ts

```diff
import { actionsEnums } from '../../../common/actionsEnums';
- import { LoginResponse } from '../../../model';
+ import { LoginResponse, LoginEntity } from '../../../model';
+ import { login } from '../../../rest-api/loginApi';
+ import { history } from '../../../history';

+ export const loginRequestStartedAction = (loginEntity: LoginEntity) => (dispatcher) => {
+   const promise = login(loginEntity);

+   promise.then((loginResponse) => {
+     dispatcher(loginRequestCompletedAction(loginResponse));

+     if (loginResponse.succeeded) {
+       history.push('/student-list');
+     }
+   });

+   return promise;
+ }

const loginRequestCompletedAction = (loginResponse: LoginResponse) => ({
  type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
  payload: loginResponse,
});

```

- On the reducers side, we are going to create `session` reducer to handle this `action`:

### ./src/reducers/session.ts

```javascript
import { actionsEnums } from '../common/actionsEnums';
import {
  UserProfile,
  createEmptyUserProfile,
  LoginEntity,
  createEmptyLoginEntity,
  LoginResponse,
} from '../model';

export interface SessionState {
  isUserLoggedIn: boolean;
  userProfile: UserProfile;
  loginEntity: LoginEntity;
}

const createEmptyState = (): SessionState => ({
  isUserLoggedIn: false,
  userProfile: createEmptyUserProfile(),
  loginEntity: createEmptyLoginEntity(),
})

export const sessionReducer = (state = createEmptyState(), action) => {
  switch (action.type) {
    case actionsEnums.USERPROFILE_PERFORM_LOGIN:
      return userProfilePerformLoginHandler(state, action.payload);
  }

  return state;
}

const userProfilePerformLoginHandler = (state: SessionState, payload: LoginResponse) => ({
  ...state,
  isUserLoggedIn: payload.succeeded,
  userProfile: payload.userProfile,
});

```

- Let's register this reducer in _./src/reducers/index.ts_:

### ./src/reducers/index.ts

```diff
import { combineReducers } from 'redux';
+ import { sessionReducer, SessionState } from './session';

+ export interface State {
+   session: SessionState;
+ }

export const reducers = combineReducers({
+ session: sessionReducer,
});

```

- It's time to jump into the ui part, we will use the login layout created in a previous sample, from repo [React By Sample: login form](https://github.com/Lemoncode/react-by-sample/tree/master/15%20LoginForm) 

### ./src/login/components/header.tsx

```javascript
import * as React from "react"

export const Header = () => {
  return (
    <div className="panel-heading">
      <h3 className="panel-title">Please sign in</h3>
    </div>
  );
}

```

### ./src/login/components/form.tsx

```javascript
import * as React from "react"
import { LoginEntity } from '../../../model/login';

interface Props {
  loginEntity: LoginEntity;
  updateLoginEntity: (loginEntity: LoginEntity) => void;
  performLogin: () => void;
}

export const Form: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="panel-body">
      <form role="form">
        <fieldset>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="E-mail"
              type="text"
              name="login"
              value={props.loginEntity.login}
              onChange={onChange(props)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              name="password"
              value={props.loginEntity.password}
              onChange={onChange(props)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success btn-block"
            onClick={onSubmit(props)}
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

const onChange = (props: Props) => (e) => {
  const fieldName = e.target.name;
  const value = e.target.value;

  props.updateLoginEntity({
    ...props.loginEntity,
    [fieldName]: value,
  });
}

const onSubmit = (props: Props) => (e) => {
  e.preventDefault();
  props.performLogin();
}

```

- Before continuing with the UI we have realized that this form components emits an event with the current editing login information (by doing this we can easily initialize it), we have to add to the session state a new property to hold this information, and an action to set it.

### ./src/common/actionEnums.ts

```diff
export const actionsEnums = {
  USERPROFILE_PERFORM_LOGIN: 'USERPROFILE_PERFORM_LOGIN',
+ USERPROFILE_UPDATE_EDITING_LOGIN:  'USERPROFILE_UPDATE_EDITING_LOGIN',
}

```

### ./src/pages/login/actions/updateEditingLogin.ts

```javascript
import { actionsEnums } from '../../../common/actionsEnums';
import { LoginEntity } from '../../../model';

export const updateEditingLogin = (loginInfo: LoginEntity) => ({
  type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
  payload: loginInfo,
});

```

#### ./src/reducers/session.ts

```diff
import { actionsEnums } from '../common/actionsEnums';
import {
  UserProfile,
  createEmptyUserProfile,
  LoginEntity,
  createEmptyLoginEntity,
  LoginResponse,
} from '../model';

export interface SessionState {
  isUserLoggedIn: boolean;
  userProfile: UserProfile;
  loginEntity: LoginEntity;
}

const createEmptyState = (): SessionState => ({
  isUserLoggedIn: false,
  userProfile: createEmptyUserProfile(),
  loginEntity: createEmptyLoginEntity(),
})

export const sessionReducer = (state = createEmptyState(), action) => {
  switch (action.type) {
    case actionsEnums.USERPROFILE_PERFORM_LOGIN:
      return userProfilePerformLoginHandler(state, action.payload);

+   case actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN:
+     return userProfileUpdateEditingLoginHandler(state, action.payload);
+ }

  return state;
}

const userProfilePerformLoginHandler = (state: SessionState, payload: LoginResponse) => ({
  ...state,
  isUserLoggedIn: payload.succeeded,
  userProfile: payload.userProfile,
});

+ const userProfileUpdateEditingLoginHandler = (state: SessionState, payload: LoginEntity) => ({
+   ...state,
+   loginEntity: payload,
+ });

```

- It's time to build the layout of the login Page:

### ./src/pages/login/login.tsx

```diff
import * as React from 'react';
+ import { Header } from './components/header';
+ import { Form } from './components/form';
+ import { LoginEntity } from '../../model';

+ interface Props {
+   loginEntity: LoginEntity;
+   updateLoginEntity: (loginEntity: LoginEntity) => void;
+   performLogin: (loginEntity: LoginEntity) => void;
+ }


- export const LoginComponent = () => {
-   return (
-     <h2>Im the login page</h2>
-   )
- }

+ export const LoginComponent: React.StatelessComponent<Props> = (props) => (
+   <div className="container">
+     <div className="row">
+       <div className="col-md-4 col-md-offset-4">
+         <div className="panel panel-default">
+           <Header />
+           <Form
+             loginEntity={props.loginEntity}
+             updateLoginEntity={props.updateLoginEntity}
+             performLogin={performLogin(props)}
+           />
+         </div>
+       </div>
+     </div>
+   </div>
+ );

+ const performLogin = (props: Props) => () => {
+   props.performLogin(props.loginEntity);
+ };

```

- No we can wire up the loginContainer component with all the reducers info and actions:

### ./src/pages/login/loginContainer.tsx

```diff
import { connect } from 'react-redux';
import { LoginComponent } from './login';
+ import { State } from '../../reducers';
+ import { LoginEntity } from '../../model';
+ import { updateEditingLogin } from './actions/updateEditingLogin';
+ import { loginRequestStartedAction } from './actions/loginRequest';

- const mapStateToProps = (state) => ({
+ const mapStateToProps = (state: State) => ({
+   loginEntity: state.session.loginEntity,
});

const mapDispatchToProps = (dispatch) => ({
+   updateLoginEntity: (loginEntity: LoginEntity) => dispatch(updateEditingLogin(loginEntity)),
+   performLogin: (loginEntity: LoginEntity) => dispatch(loginRequestStartedAction(loginEntity)),
});

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);

```
