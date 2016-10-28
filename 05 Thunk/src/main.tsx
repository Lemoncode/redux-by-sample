import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers'
import {App} from './app';
import reduxThunk from 'redux-thunk';

let store = createStore(
  reducers,
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
   <Provider store={store}>
    <App/>
   </Provider>
  , document.getElementById('root'));
