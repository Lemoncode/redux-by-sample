# 10 Hot Loader

This sample series takes as starting point _09 SimpleApp Validation_

In this sample we are going to add some goodies to let easily debug and
develop our application:

- We will configure react hot loader, allowing us to update the code of the app without having to redeploy the whole thing and refresh our browser to get the changes updated.

Summary steps:

- Install ReactHotLoader libraries.
- Configure webpack to support hot loading.
- Refactor `main.tsx`

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (>= 6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _09 Simple App Validation_ and execute _npm install_.

- As we saw in sample `06 SimpleApp_Navigation` we had installed [`redux-devtools`](https://github.com/gaearon/redux-devtools). This is great, specially the "time machine" option, but what happen if we need to add changes to our code? As soon as webpack is launched we will loose all our state and the page will be refresh or... wait [`react-hot-loader`](https://github.com/gaearon/react-hot-loader) to the rescue!

By using this we can add changes to our code and webpack will only push the pieces of JavaScript that have changed, no need to refresh the browser, no state lost. Let's start by installing the hot loader:

```
npm install react-hot-loader@latest --save-dev
```

- We have to install `react-hot-loader` typings:

```
npm install @types/react-hot-loader --save-dev
```

- Let's update `webpack.config.js`:

### ./webpack.config.js

```diff
  ...
  entry: [
+   'react-hot-loader/patch',
    './main.tsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
  ],
  ...
  devServer: {
    contentBase: './dist', // Content base
    inline: true, // Enable watch and live reload
    host: 'localhost',
    port: 8080,
-   stats: 'errors-only'
+   stats: 'errors-only',
+   hot: true,
  },
  ...
  plugins: [
    // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: 'index.html', // Name of template in ./src
      hash: true
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
+   new webpack.HotModuleReplacementPlugin(),
  ]
```

- Enable ES6 modules and enable `react-hot-loader` plugin in `.babelrc`:

### ./.babelrc
```diff
{
  "presets": [
-   "env",
+   [
+     "env",
+     {
+       "modules": false
+     }
+   ]
- ]
+ ],
+ "plugins": [
+   "react-hot-loader/babel"
+ ]
}
```

- We have to install `webpack-env` typings to get access to `module`:

```
npm install @types/webpack-env --save-dev
```

- And configure `tsconfig.json` to use as global `typings`:

### ./tsconfig.json
```diff
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "jsx": "react",
    "sourceMap": true,
    "noLib": false,
-   "suppressImplicitAnyIndexErrors": true
+   "suppressImplicitAnyIndexErrors": true,
+   "types": [
+     "webpack-env"
+   ]
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- Finally, we have to add `AppContainer` from `react-hot-loader` on top of our App. `AppContainer` is automatically disabled for production. But before configure `AppContainer` we are going to separate `main.tsx` file in several components:

### ./src/store.ts

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import {reducers} from './reducers';
import reduxThunk from 'redux-thunk';

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  )
);

```

### ./src/router.ts
```javascript
import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {store} from './store';
import {App} from './app';
import {LoginContainer} from './pages/login';
import {StudentListContainer} from './pages/student-list';
import {StudentDetailContainer} from './pages/student-detail';

const history = syncHistoryWithStore(hashHistory, store);

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={LoginContainer}/>
        <Route path="login" component={LoginContainer}/>
        <Route path="student-list" component={StudentListContainer}/>
        <Route path="student-detail/:id" component={StudentDetailContainer}/>
      </Route>
    </Router>
  );
}

```

### ./src/provider.ts
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store';
import {AppRouter} from './router';

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

```

### ./src/main.tsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import { createStore, applyMiddleware, compose } from 'redux';
- import { Router, Route, IndexRoute, hashHistory } from 'react-router';
- import { syncHistoryWithStore } from 'react-router-redux'
- import reduxThunk from 'redux-thunk';
- import { Provider } from 'react-redux';
- import {reducers} from './reducers'
- import {App} from './app';
- import {LoginContainer} from './pages/login';
- import {StudentListContainer} from './pages/student-list';
- import {StudentDetailContainer} from './pages/student-detail';
+ import {AppProvider} from './provider';
+ import {AppContainer} from 'react-hot-loader';

- let store = createStore(
-   reducers,
-   compose(
-     applyMiddleware(reduxThunk),
-     window['devToolsExtension'] ? window['devToolsExtension']() : f => f
-   )
- );

- const history = syncHistoryWithStore(hashHistory, store);

- ReactDOM.render(
-   <Provider store={store}>
-     <div>
-       <Router history={history}>
-         <Route path="/" component={App}>
-           <IndexRoute component={LoginContainer}/>
-           <Route path="login" component={LoginContainer}/>
-           <Route path="student-list" component={StudentListContainer}/>
-           <Route path="student-detail/:id" component={StudentDetailContainer}/>
-         </Route>
-       </Router>
-     </div>
-   </Provider>,
-   document.getElementById('root')
- );

+ const render = (Component) => {
+   ReactDOM.render(
+     <AppContainer>
+       <Component />
+     </AppContainer>,
+     document.getElementById('root')
+   );
+ };

+ render(AppProvider);

+ if(module.hot) {
+   module.hot.accept('./provider', () => {
+     render(AppProvider);
+   });
+ }

```

> [Migration to 3.0 guide](https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30)

- Let's give a try and check that we can update code and no browser refresh is needed.

```
npm start
```
