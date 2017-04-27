import { connect } from 'react-redux';
import { studentListRequestStartedAction } from "./actions/studentListRequestStarted";
import { StudentListComponent } from './studentList';

const mapStateToProps = (state) => {
    return {
      studentList: state.studentReducer.studentsList
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentList: () => dispatch(studentListRequestStartedAction()),
  }
}

export const StudentListContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentListComponent);
