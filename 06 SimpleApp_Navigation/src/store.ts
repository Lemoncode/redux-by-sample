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
