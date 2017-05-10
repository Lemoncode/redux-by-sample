import * as React from 'react';
import {Header} from './components/header';
import {Form} from './components/form';
import {LoginEntity} from '../../model/login';

interface Props {
   loginInfo : LoginEntity;
   updateLoginInfo : (loginInfo : LoginEntity) => void;
   performLogin : (loginInfo : LoginEntity) => void;
}

export const LoginComponent = (props : Props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <Header/>
            <Form loginInfo={props.loginInfo}
                  updateLoginInfo={props.updateLoginInfo.bind(this)}
                  performLogin={() => props.performLogin(props.loginInfo)}
                  />
          </div>
        </div>
      </div>
    </div>
  )
}
