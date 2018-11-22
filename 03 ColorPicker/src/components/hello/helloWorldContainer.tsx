import {connect} from 'react-redux';
import {State} from '../../reducers';
import {HelloWorldComponent} from './helloWorld';

const mapStateToProps = (state : State) => {
  return {
    userName: state.userProfileReducer.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const HelloWorldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldComponent);
