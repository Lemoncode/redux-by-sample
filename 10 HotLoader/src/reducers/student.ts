import { actionsEnums } from "../common/actionsEnums";
import { StudentEntity } from "../model/student";
import { StudentErrors } from "../model/studentErrors";
import { IStudentFieldValueChangedCompletedPayload } from "../pages/student-detail/actions/studentFieldValueChangedCompleted";


class StudentState  {
  studentsList: StudentEntity[];
  editingStudent: StudentEntity;
  editingStudentErrors: StudentErrors;

  public constructor() {
    this.studentsList = [];
    this.editingStudent = new StudentEntity();
    this.editingStudentErrors = new StudentErrors();
  }
}

export const studentReducer =  (state: StudentState = new StudentState(), action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return handleGetStudentList(state, action.payload);
   case actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED:
     return handleGetStudent(state, action.payload);  
   case actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED:
     return handleFieldValueChanged(state, action.payload);                
               
  }

  return state;
};

const handleFieldValueChanged = (state: StudentState, payload) => {
  const newStudent = {
      ...state.editingStudent,
      [payload.fieldName]: payload.value
  };

  const newStudentErrors = {
    ...state.editingStudentErrors, 
    [payload.fieldName]: payload.fieldValidationResult
  };
  

  return {
      ...state,
      editingStudent: newStudent,
      editingStudentErrors: newStudentErrors
  }
};

const handleGetStudentList = (state: StudentState, payload: StudentEntity[]) => {
  return {
    ...state,
    studentsList: payload
  }
};

const handleGetStudent = (state: StudentState, payload: StudentEntity[]) => {
 return {
    ...state,
    editingStudent: payload
 }  
};

