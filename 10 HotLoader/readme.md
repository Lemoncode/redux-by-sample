# 10 Hot Loader

This sample series takes as starting point _09 SimpleApp Validation_

In this sample we are going to add some goodies to let easily debug and
develop our application:

- We will configure react hot loader, allowing us to update the code of the app without having to redeploy the whole thing and refresh our browser to get the changes updated.

Summary steps:

- Install ReactHotLoader libraries.
- Configure webpack to support hot loading.


# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _09 Simple App Validation_ and execute _npm install_.

- As we see in sample `06 SimpleAPP_Navigation` we had installed [`redux-devtools`](https://github.com/gaearon/redux-devtools). This is great, specially the "time machine" option, but what happen if we need to add changes to our code? As soon as webpack is launched we will loose all our state and the page will be refresh or... wait [`react-hot-loader`](https://github.com/gaearon/react-hot-loader) to the rescue !

By using this we can add changes to our code and webpack will only push the pieces of JavaScript that have changed, no need to refresh the browser, no state lost. Let's start by installing the hot loader:

```
npm install react-hot-loader@next --save-dev
```

- We have to install the typings for `react-hot-loader`:

```
npm install @types/react-hot-lodear --save-dev
```

- Let's add some paths to the webpack config entry section:

### ./webpack.config.js
```diff
  ...
  entry: [
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
    stats: 'errors-only'
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
  ]
```

- Enable ES6 modules in `.babelrc`:

### ./.babelrc
```diff
{
  "presets": [
    "env",
  ]
}

```

- We have to install `webpack-env` typings to get access to `module`:

```
npm install @types/webpack-env --save-dev
```

- And configure `tsconfig.json`:

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
    "suppressImplicitAnyIndexErrors": true
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
```

### ./src/router.ts
```javascript
```

### ./src/provider.ts
```javascript
```

### ./src/main.tsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {reducers} from './reducers'
import {App} from './app';
import {LoginContainer} from './pages/login';
import {StudentListContainer} from './pages/student-list';
import {StudentDetailContainer} from './pages/student-detail';


let store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  )  
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={LoginContainer}/>
          <Route path="login" component={LoginContainer}/>
          <Route path="student-list" component={StudentListContainer}/>
          <Route path="student-detail/:id" component={StudentDetailContainer}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);


```

- Let's update the _dev_server_ settings to allow live reload:

```javascript
devServer: {
       contentBase: './dist', //Content base
       inline: true, //Enable watch and live reload
       hot: true,
       //(...)
  },
```

- Let's update ts loader to add some code injected by the react hot loader.

```javascript
  module: {
        loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'ts']
      },
      // (..)
    },
```

- Let's include the HotModuleReplacement plugin

```javascript
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // (...)
```

- Let's give a try and check that we can update code and no browser refresh is needed.

```
npm start
```
