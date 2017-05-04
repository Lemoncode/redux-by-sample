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