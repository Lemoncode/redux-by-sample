import {} from 'core-js'
import {actionsEnums} from '../common/actionsEnums';
import {StudentEntity} from '../model/student';
import {StudentErrors} from '../model/studentErrors';
import {IStudentFieldValueChangedCompletedPayload} from '../pages/student-detail/actions/studentFieldValueChangedCompleted';

class StudentState  {
  studentsList : StudentEntity[];
  editingStudent : StudentEntity;
  editingStudentErrors : StudentErrors;

  public constructor()
  {
    this.studentsList = [];
    this.editingStudent = new StudentEntity();
    this.editingStudentErrors = new StudentErrors();
  }
}

export const studentReducer =  (state : StudentState = new StudentState(), action) => {
      switch (action.type) {
        case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
           return handleGetStudentList(state, action.payload);
       case actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED:
          return handleGetStudent(state, action.payload);
       case actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED:
          return handleFieldValueChanged(state, action.payload)
      }

      return state;
};

const handleGetStudentList = (state : StudentState, payload : StudentEntity[]) => {
  const newState = Object.assign({}, state, {studentsList: payload});
  return newState;
}


const handleGetStudent = (state : StudentState, payload : StudentEntity[]) => {
  const newState = Object.assign({}, state, {editingStudent: payload});
  return newState;
}

const handleFieldValueChanged = (state : StudentState, payload : IStudentFieldValueChangedCompletedPayload) => {
  const newStudent = Object.assign({}, state.editingStudent, {[payload.fieldName]: payload.value});
  const newStudentErrors = Object.assign({}, state.editingStudentErrors, {[payload.fieldName]: payload.fieldValidationResult});
  return Object.assign({}, state, {editingStudent: newStudent, editingStudentErrors: newStudentErrors})
}
