import { connect } from 'react-redux';
import { LoginComponent } from './login';

const mapStateToProps = (state) => {
    return {
      
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const LoginContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(LoginComponent);
