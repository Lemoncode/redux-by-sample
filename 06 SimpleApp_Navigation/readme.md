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

- It's time to install routing libraries:

```bash
npm install react-router-dom react-router-redux --save
```

```bash
npm install @types/react-router-dom @types/react-router-redux --save-dev
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
+     'react-router-redux',
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
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { reducers } from './reducers';

const middlewares = [
  routerMiddleware() <---// TODO: Necessary history
];

```

- We need to pass an `history` instance to `routerMiddleware`, that it's necessary by `redux devTools` to navigate.

### ./src/history.ts

```javascript
import createHistory from 'history/createHashHistory';

export const history = createHistory();

```

- Now, we could import and use it:

### ./src/store.ts

```diff
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { reducers } from './reducers';
+ import { history } from './history';


const middlewares = [
- routerMiddleware()
+ routerMiddleware(history),
+ reduxThunk,
];

+ const composeEnhancers = (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
+   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
+   compose;

+ export const store = createStore(
+   reducers,
+   composeEnhancers(
+     applyMiddleware(...middlewares),
+   ),
+ );

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

- Is time to wire up the navigation, let's start by adding _routerReducre_

### ./src/reducers/index.ts

```diff
import { combineReducers } from 'redux';
- import { userProfileReducer } from './userProfile';
+ import { routerReducer } from 'react-router-redux';

export const reducers = combineReducers({
- userProfileReducer
+ routing: routerReducer,
});

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

- Finally, we have to use `appRoutes` in `main.tsx`:

### ./src/main.tsx

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
- import { App } from './app';
+ import { HashRouter } from 'react-router-dom';
+ import { AppRoutes } from './appRoutes';

ReactDOM.render(
  <Provider store={store}>
-   <App />
+    <HashRouter>
+     <AppRoutes />
+   </HashRouter>
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
export class LoginEntity {
  login : string;
  password : string;

  public constructor() {
    this.login = '';
    this.password = '';
  }
}

```

- And a userProfile entity.

_./src/model/userProfile.ts_

```javascript
export class UserProfile {
  fullname : string;
  role : string;
}
```

- A loginResponse:

_./src/model/loginResponse.ts_

```javascript
import {UserProfile} from './userProfile';

export class LoginResponse {
  succeeded : boolean;
  userProfile : UserProfile;
}
```

- Let's add a fake API to simulate a login (_./src/rest-api/loginApi.ts_).

_./src/rest-api/loginApi.ts_

```javascript
import {LoginEntity} from '../model/login';
import {UserProfile} from '../model/userProfile';
import {LoginResponse} from '../model/loginResponse';

class LoginApi {
  login(loginInfo : LoginEntity) : Promise<LoginResponse> {
      let loginResponse = new LoginResponse();

      if(loginInfo.login === 'admin' && loginInfo.password === 'test') {
        loginResponse.succeeded = true;
        loginResponse.userProfile = {fullname: "John Doe", role: 'admin' };
      } else {
        loginResponse.succeeded = false;
        loginResponse = null;
      }

      return Promise.resolve(loginResponse);
  }
}
```

- Let's get started implementing our login functionallity, first we will define
a perform login action (_./src/common/actions_):

_./src/common/actionsEnums_

```diff
export const actionsEnums = {  
-  UPDATE_USERPROFILE_NAME : 'UPDATE_USERPROFILE_NAME '
+  USERPROFILE_PERFORM_LOGIN : 'USERPROFILE_PERFORM_LOGIN'
}
```

- Login action will be asynchronous (we need to break it into two actions and use
  redux-thunk), we will create two actions _loginRequestStarted_ and _loginRequestCompleted_.

- Let's go for the completed _./src/pages/login/actions/loginRequestCompleted.ts_

```javascript
import {actionsEnums} from '../../../common/actionsEnums';
import {LoginResponse} from '../../../model/loginResponse';

export const loginRequestCompletedAction = (loginResponse : LoginResponse) => {
  return {
    type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
    payload: loginResponse
  }
}
```


- Since this action is something we will fire only on the
login window we will keep this under the following path _./src/pages/login/actions/loginRequestStarted.ts_

```javascript
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

    );

    return promise;
  }
}

export const loginApi = new LoginApi();
```

- Now the completed _./src/pages/login/actions/loginRequestCompleted.ts_

```javascript
import {actionsEnums} from '../../../common/actionsEnums';
import {LoginResponse} from '../../../model/loginResponse';

export const loginRequestCompleted = (loginResponse : LoginResponse) => {
  return {
    type: actionsEnums.USERPROFILE_PERFORM_LOGIN,
    payload: loginResponse
  }
}
```

- On the reducers side, let's remove the _./src/reducers/userProfile.ts_ reducer
and add a new reducer that we will call _./src/reducers/session.ts_

_./src/reducers/session.ts_

```javascript
import {actionsEnums} from '../common/actionsEnums';
import {UserProfile} from '../model/userProfile';
import {LoginResponse} from '../model/loginResponse';
import {LoginEntity} from '../model/login';

class SessionState  {
  isUserLoggedIn : boolean;
  userProfile : UserProfile;
  editingLogin : LoginEntity;

  public constructor()
  {
    this.isUserLoggedIn = false;
    this.userProfile = new UserProfile();
  }
}

export const sessionReducer =  (state : SessionState = new SessionState(), action) => {
      switch (action.type) {
        case actionsEnums.USERPROFILE_PERFORM_LOGIN:
           return handlePerformLogin(state, action.payload);


      }

      return state;
};


const handlePerformLogin = (state : SessionState, payload : LoginResponse) => {
  return {...state, 
          isUserLoggedIn: payload.succeeded, 
          userProfile: payload.userProfile
         };  
}
```

- Let's register this reducer _./src/reducers/index.ts_:

_./src/reducers/index.ts_

```diff
import { combineReducers } from 'redux';
- import { userProfileReducer } from './userProfile';
+ import { sessionReducer } from './session';
import { routerReducer } from 'react-router-redux'

export const reducers =  combineReducers({
-  userProfileReducer,
+  sessionReducer,
  routing: routerReducer
});
```

- It's time to jump into the ui part, we will use the login layout created in
a previous sample, from repo [React By Sample: login form](https://github.com/Lemoncode/react-by-sample/tree/master/15%20LoginForm) 

_./src/login/components/header.tsx_

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

_./src/login/components/form.tsx_

```javascript
import * as React from "react"
import {hashHistory} from 'react-router'
import {LoginEntity} from '../../../model/login';

interface Props {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : () => void;
}

export const Form = (props: Props) => {
  return (
    <div className="panel-body">
      <form role="form">
        <fieldset>
          <div className="form-group">
      		  <input className="form-control" placeholder="E-mail" name="email" type="text"
              value={props.loginInfo.login}
              onChange={(e : any) => props.updateLoginInfo({login: e.target.value, password: props.loginInfo.password })}
            />
      		</div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" type="password"
              value={props.loginInfo.password}
              onChange={(e : any) => props.updateLoginInfo({login: props.loginInfo.login, password: e.target.value })}
            />
          </div>
          <input className="btn btn-lg btn-success btn-block" value="Login"
            onClick={(e) => {props.performLogin()}}
          />
        </fieldset>
      </form>
    </div>
  );
}
```

- Before continuing with the UI we have realized that this form components emits an event with the current
editing login information (by doing this we can easily initialize it), we have to add to the session state
a new property to hold this information, and an action to set it.

_./src/common/actionEnums.ts_

```diff
export const actionsEnums = {
+  USERPROFILE_UPDATE_EDITING_LOGIN:  'USERPROFILE_UPDATE_EDITING_LOGIN',
  USERPROFILE_PERFORM_LOGIN : 'USERPROFILE_PERFORM_LOGIN'
}
```

_./src/pages/login/actions/updateEditingLogin.ts

```javascript
import {actionsEnums} from '../../../common/actionsEnums';
import {LoginEntity} from '../../../model/login';

export const updateEditingLogin = (loginInfo : LoginEntity) => {
  return {
    type: actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN,
    payload: loginInfo
  }
}
```

_./src/reducers/session.ts_

```diff
import {actionsEnums} from '../common/actionsEnums';
import {UserProfile} from '../model/userProfile';
import {LoginResponse} from '../model/loginResponse';
import {LoginEntity} from '../model/login';

class SessionState  {
  isUserLoggedIn : boolean;
  userProfile : UserProfile;
+  editingLogin : LoginEntity;

  public constructor()
  {
    this.isUserLoggedIn = false;
    this.userProfile = new UserProfile();
+    this.editingLogin = new LoginEntity();
  }
}

export const sessionReducer =  (state : SessionState = new SessionState(), action) => {
      switch (action.type) {
        case actionsEnums.USERPROFILE_PERFORM_LOGIN:
           return handlePerformLogin(state, action.payload);

+        case actionsEnums.USERPROFILE_UPDATE_EDITING_LOGIN:
+           return handleUpdateEditingLogin(state, action.payload);
      }

      return state;
};


const handlePerformLogin = (state : SessionState, payload : LoginResponse) => {
  return {...state, 
          isUserLoggedIn: payload.succeeded, 
          userProfile: payload.userProfile
         };  
}


+const handleUpdateEditingLogin = (state: SessionState, payload : LoginEntity) => {
+  return {
+    ...state, 
+    editingLogin: payload
+  };
}
```

- It's time to build the layout of the login Page _./src/pages/login/login.tsx_

```javascript
import * as React from 'react';
import {Header} from './components/header';
import {Form} from './components/form';
import {LoginEntity} from '../../model/login';

interface Props {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : (loginInfo : LoginEntity) => void;
}

export const LoginComponent = (props : Props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <Header/>
            <Form loginInfo={props.loginInfo}
                  updateLoginInfo={props.updateLoginInfo.bind(this)}
                  performLogin={() => props.performLogin(props.loginInfo)}
                  />
          </div>
        </div>
      </div>
    </div>
  )
}
```

- No we can wire up the loginContainer component with all the reducers info and actions

_./src/pages/login/loginContainer.tsx_

```diff
import { connect } from 'react-redux';
import { LoginComponent } from './login';
+ import { LoginEntity } from '../../model/login';
+ import { updateEditingLogin } from './actions/updateEditingLogin';
+ import { loginRequestStartedAction} from './actions/loginRequestStarted';


const mapStateToProps = (state) => {
    return {
+      loginInfo: state.sessionReducer.editingLogin
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
+    updateLoginInfo: (loginInfo : LoginEntity) => dispatch(updateEditingLogin(loginInfo)),
+    performLogin: (loginInfo : LoginEntity) => dispatch(loginRequestStartedAction(loginInfo))    
  }
}

export const LoginContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(LoginComponent);

```












