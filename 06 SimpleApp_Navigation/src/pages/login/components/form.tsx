import * as React from "react"
import { LoginEntity } from '../../../model/login';

interface Props {
  loginEntity: LoginEntity;
  updateLoginEntity: (loginEntity: LoginEntity) => void;
  performLogin: () => void;
}

export const Form: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="panel-body">
      <form role="form">
        <fieldset>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="E-mail"
              type="text"
              name="login"
              value={props.loginEntity.login}
              onChange={onChange(props)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              name="password"
              value={props.loginEntity.password}
              onChange={onChange(props)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success btn-block"
            onClick={onSubmit(props)}
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

const onChange = (props: Props) => (e) => {
  const fieldName = e.target.name;
  const value = e.target.value;

  props.updateLoginEntity({
    ...props.loginEntity,
    [fieldName]: value,
  });
}

const onSubmit = (props: Props) => (e) => {
  e.preventDefault();
  props.performLogin();
}
