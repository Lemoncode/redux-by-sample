import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { App } from './app';
import { LoginContainer } from './pages/login';
import { StudentListContainer } from './pages/student-list';
import { StudentDetailContainer } from './pages/student-detail';

export const AppRoutes: React.StatelessComponent = (props) => (
  <App>
    <Switch>
      <Route exact={true} path="/" component={LoginContainer} />
      <Route path="/student-list" component={StudentListContainer} />
      <Route path="/student-detail" component={StudentDetailContainer} />
    </Switch>
  </App>
);
