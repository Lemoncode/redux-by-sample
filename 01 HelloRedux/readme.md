# 01 Hello Redux

In this sample we will create a full react + redux app just to display a HelloWorld message like.
Of course doing such thing is an overkill, is just to tackle on a simple sample and learn the
concepts.

We will take a startup point sample _00 Boilerplate.


Summary steps:

- Install react, react-dom, redux libraries.
- Install react, react-dom, redux typescript definitions.
- Update the index.html to create a placeholder for the react components
- Create a HelloWorld component.
- Create an _app.tsx_ as entry point.
- Create the react-dom entry point _main.tsx_.
- Create a reducer (it will hold user name).
- Wire it up.
- Create a HelloworldContainer component and perform the connections.
- Include this HelloworldContainer component in the _app.tsx_

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _00 Boilerplate_ and execute _npm install_.

- Let's install react, react-dom and redux libraries:

```javascript
npm install react react-dom redux react-redux --save
```

- let's install typescript definitions for this libraries:

```
npm install @types/react @types/react-dom @types/redux @types/react-redux --save
```

- Update webpack config in order to take as entry point _main.tsx_

```javascript
entry: [
  './main.tsx',
  '../node_modules/bootstrap/dist/css/bootstrap.css'
],

```

- Update the index.html to create a placeholder for the react components

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Sample app</h1>
    <div id="root">
    </div>    
  </body>
</html>
```

- Create the react-dom entry point _main.tsx_.

```
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <h2>Temp content</h2>
  , document.getElementById('root'));
```

- Create a HelloWorld component.

```javascript
import * as React from 'react';

export const HelloComponent = (props : {userName : string}) => {
  return (
    <h2>Hello Mr. {props.userName} !</h2>
  );
}
```


- Create a reducer (it will hold user name), path: _./src/reducers/userprofile.ts_.

```javascript
class userProfileState  {
  firstname : string;

  public constructor()
  {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : userProfileState = new userProfileState(), action) => {
      return state;
};
```
- Let's create an index file under _./src/reducers/index.ts_ this file will
combine all reducers references in the future.

```javascript
import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
import { Provider } from 'react-redux';


export const reducers =  combineReducers({
  userProfileReducer
});

```

- Wire it up _main.tsx_.

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers'

let store = createStore(reducers);

ReactDOM.render(
   <Provider store={store}>
      <h2>Temp Content</h2>
   </Provider>
  , document.getElementById('root'));
```


- Create a HelloworldContainer component and perform the connections, full path
_./src/helloWolrContainer.ts_.

```javascript
import { connect } from 'react-redux';
import { HelloWorldComponent } from './helloWorld';

const mapStateToProps = (state) => {
    return {
      userName: state.userProfile.firstname
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const helloWorldContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(HelloWorldComponent);
```

- Include this HelloworldContainer component in the _app.tsx

```javascript
import { connect } from 'react-redux';
import { HelloWorldComponent } from './helloWorld';

const mapStateToProps = (state) => {
    return {
      userName: state.userProfileReducer.firstname
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const HelloWorldContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(HelloWorldComponent);
```

- Let's give a try to the sample.

```
npm start
```
