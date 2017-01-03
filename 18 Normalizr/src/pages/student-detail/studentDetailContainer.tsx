import { connect } from "react-redux";
import { StudentDetailComponent } from "./studentDetail";
import { getStudentRequestStartAction } from "./actions/getStudentRequestStart";
import { studentFieldValueChangedStart } from "./actions/studentFieldValueChangedStart";
import { studentSaveRequestStart } from "./actions/studentSaveRequestStart";
import { resetStudentAction } from './actions/resetStudent';
import { StudentEntity } from "../../model/student";

const mapStateToProps = (state) => {
  return {
    student: state.studentDomain.edit.editingStudent,
    errors: state.studentDomain.edit.editingStudentErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getstudent: (id: number) => dispatch(getStudentRequestStartAction(id)),
    saveStudent: (student: StudentEntity) => dispatch(studentSaveRequestStart(student)),
    fireFieldValueChanged: (
      viewModel: any,
      fieldName: string,
      value: any) => dispatch(studentFieldValueChangedStart(viewModel, fieldName, value)
    ),
    resetStudent: () => dispatch(resetStudentAction())
  };
};

export const StudentDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentDetailComponent);
