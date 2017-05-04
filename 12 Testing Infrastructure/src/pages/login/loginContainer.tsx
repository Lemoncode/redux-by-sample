import { connect } from 'react-redux';
import { LoginComponent } from './login';
import { LoginEntity } from '../../model/login';
import { updateEditingLogin } from './actions/updateEditingLogin';
import { loginRequestStartedAction} from './actions/loginRequestStarted';

const mapStateToProps = (state) => {
    return {
      loginInfo: state.sessionReducer.editingLogin      
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginInfo: (loginInfo : LoginEntity) => dispatch(updateEditingLogin(loginInfo)),
    performLogin: (loginInfo : LoginEntity) => dispatch(loginRequestStartedAction(loginInfo))        
  }
}

export const LoginContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(LoginComponent);
