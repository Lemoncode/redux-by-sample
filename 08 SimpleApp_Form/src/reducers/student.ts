import { actionsEnums } from "../common/actionsEnums";
import { StudentEntity } from "../model/student";

class StudentState  {
  studentsList: StudentEntity[];
  editingStudent: StudentEntity;

  public constructor() {
    this.studentsList = [];
    this.editingStudent = new StudentEntity();
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

  return {
      ...state,
      editingStudent: newStudent
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

