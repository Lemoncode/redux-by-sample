import { connect } from 'react-redux';
import { LoginComponent } from './login';
import { State } from '../../reducers';
import { LoginEntity } from '../../model';
import { updateEditingLogin } from './actions/updateEditingLogin';
import { loginRequestStartedAction } from './actions/loginRequest';

const mapStateToProps = (state: State) => ({
  loginEntity: state.session.loginEntity,
});

const mapDispatchToProps = (dispatch) => ({
  updateLoginEntity: (loginEntity: LoginEntity) => dispatch(updateEditingLogin(loginEntity)),
  performLogin: (loginEntity: LoginEntity) => dispatch(loginRequestStartedAction(loginEntity)),
});

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
