# 09 Simple App D

This sample series takes as starting point _09 SimpleApp Validation_

In this sample we are going to add some goodies to let easily debug and
develop our application:

- We will add support for redux dev tools.
- We will configure react hot loader, allowing us to update the code of
the app without having to redeploy the whole thing and refresh our
browser to get the changes updated.

Summary steps:

- Install redux dev tools.
- Install ReactHotLoader libraries.
- Configure webpack to support hot loading.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _09 Simple App Validation_ and execute _npm install_.

- Let's install the redux dev tools chrome

[Direct install chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
[Install it from scratch](https://github.com/zalmoxisus/redux-devtools-extension)

- In the _createStore_ let's add a line of code to check if the devtool is available, then integrate it.

_./src/main.tsx_

```javascript
import { createStore, applyMiddleware, compose } from 'redux';

// (...)
let store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  )
);
```

- Now let's give a try and play with redux dev tool browser extension.

```javascript
npm start
```

- 