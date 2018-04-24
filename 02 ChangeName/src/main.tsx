import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers';
import {App} from './app';

const nonTypedWindow : any = window;
const store = createStore(reducers,
                          nonTypedWindow.__REDUX_DEVTOOLS_EXTENSION__ && nonTypedWindow.__REDUX_DEVTOOLS_EXTENSION__()
                         );

ReactDOM.render(
  
  <Provider store={store}>
    <>
    <App/>,
    </>
  </Provider>  
  ,
  document.getElementById('root'));