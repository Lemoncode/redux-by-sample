import { connect } from 'react-redux';
import { StudentListComponent } from './studentList';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const StudentListContainer = connect(
  mapStateToProps
  , mapDispatchToProps
)(StudentListComponent);