import { connect } from 'react-redux';
import { studentListRequestStartedAction } from "./actions/studentListRequestStarted";
import { StudentListComponent } from './studentList';
import { navigateToEditStudentAction } from "./actions/navigateToEditStudent";

const mapStateToProps = (state) => {
    return {
      studentList: state.studentReducer.studentsList
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentList: () => dispatch(studentListRequestStartedAction()),
    editStudent: (id: number) => dispatch(navigateToEditStudentAction(id)),
  }
}

export const StudentListContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentListComponent);
