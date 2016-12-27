import { connect } from "react-redux";
import { studentListRequestStartedAction } from "./actions/studentListRequestStarted";
import { StudentListComponent } from "./studentList";
import { navigateToEditStudentAction } from "./actions/navigateToEditStudent";
import { getStudents } from '../../reducers'

const mapStateToProps = (state) => {
  return {
    studentList: getStudents(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentList: () => dispatch(studentListRequestStartedAction()),
    editStudent: (id: number) => dispatch(navigateToEditStudentAction(id)),
  };
};

export const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentListComponent);
