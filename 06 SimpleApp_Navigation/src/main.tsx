import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Router } from 'react-router-dom';
import { history } from './history';
import { AppRoutes } from './appRoutes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById('root'));
