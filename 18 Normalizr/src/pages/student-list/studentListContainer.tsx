import { connect } from "react-redux";
import { studentListRequestStartedAction } from "./actions/studentListRequestStarted";
import { StudentListComponent } from "./studentList";
import { navigateToEditStudentAction, navigateToNewStudentAction } from "./actions/navigateToEditStudent";
import { getStudents } from '../../reducers/domain/selectors';
import { fetchCountryListRequestStartedAction } from './actions/fetchCountryList';
import {State} from '../../reducers';

const mapStateToProps = (state: State) => {
  return {
    studentList: getStudents(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentList: () => dispatch(studentListRequestStartedAction()),
    editStudent: (id: number) => dispatch(navigateToEditStudentAction(id)),
    navigateToAddNewStudent: () => dispatch(navigateToNewStudentAction()),
    fetchCountryList: () => dispatch(fetchCountryListRequestStartedAction())
  };
};

export const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentListComponent);
