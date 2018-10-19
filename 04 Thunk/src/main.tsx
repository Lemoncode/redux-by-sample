import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {reducers} from './reducers';
import {App} from './app';

const nonTypedWindow : any = window;

const composeEnhancers = nonTypedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
   applyMiddleware(reduxThunk)
));
  

ReactDOM.render(
  <Provider store={store}>
    <>      
    <App/>
    </>
  </Provider>,
  document.getElementById('root'));
