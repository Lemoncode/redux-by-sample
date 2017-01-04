import { connect } from "react-redux";
import { StudentDetailComponent } from "./studentDetail";
import { getStudentRequestStartAction } from "./actions/getStudentRequestStart";
import { studentFieldValueChangedStart } from "./actions/studentFieldValueChangedStart";
import { studentSaveRequestStart } from "./actions/studentSaveRequestStart";
import { resetStudentAction } from './actions/resetStudent';
import { StudentView } from "../../model/view/studentView";
import { getCountries } from '../../reducers/domain/country';

const mapStateToProps = (state) => {
  return {
    student: state.studentDomain.edit.editingStudent,
    errors: state.studentDomain.edit.editingStudentErrors,
    countries: getCountries(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getstudent: (id: number) => dispatch(getStudentRequestStartAction(id)),
    saveStudent: (student: StudentView) => dispatch(studentSaveRequestStart(student)),
    fireFieldValueChanged: (
      viewModel: any,
      fieldName: string,
      value: any,
      subProperty?: string) => dispatch(studentFieldValueChangedStart(viewModel, fieldName, value, subProperty)
    ),
    resetStudent: () => dispatch(resetStudentAction())
  };
};

export const StudentDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentDetailComponent);
