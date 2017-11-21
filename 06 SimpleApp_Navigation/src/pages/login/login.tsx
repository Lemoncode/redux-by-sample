import * as React from 'react';
import { Header } from './components/header';
import { Form } from './components/form';
import { LoginEntity } from '../../model';

interface Props {
  loginEntity: LoginEntity;
  updateLoginEntity: (loginEntity: LoginEntity) => void;
  performLogin: (loginEntity: LoginEntity) => void;
}

export const LoginComponent: React.StatelessComponent<Props> = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <Header />
          <Form
            loginEntity={props.loginEntity}
            updateLoginEntity={props.updateLoginEntity}
            performLogin={performLogin(props)}
          />
        </div>
      </div>
    </div>
  </div>
);

const performLogin = (props: Props) => () => {
  props.performLogin(props.loginEntity);
};
