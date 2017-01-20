import { actionsEnums } from "../../../common/actionsEnums";
import { StudentView } from "../../../model/view/studentView";
import { StudentErrors } from "../../../model/view/studentErrors";
import { IStudentFieldValueChangedCompletedPayload } from "../../../pages/student-detail/actions/studentFieldValueChangedCompleted";

export class EditState  {
  editingStudent: StudentView;
  editingStudentErrors: StudentErrors;

  public constructor() {
    this.editingStudent = new StudentView();
    this.editingStudentErrors = new StudentErrors();
  }
}

export const edit =  (state : EditState = new EditState(), action) => {
  switch (action.type) {
    case actionsEnums.FETCH_STUDENT_REQUEST_COMPLETED:
      return handleGetStudent(state, action.payload);
    case actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED:
      return handleFieldValueChanged(state, action.payload);
    case actionsEnums.RESET_EDITING_STUDENT:
      return handleResetEditingStudent(state);
  }
  return state;
};

const handleGetStudent = (state: EditState, payload: StudentView[]) => {
  return {
    ...state,
    editingStudent: payload
  };
};

const handleFieldValueChanged = (state: EditState, payload: IStudentFieldValueChangedCompletedPayload) => {
  return {
    ...state,
    editingStudent: {
      ...state.editingStudent,
      [payload.fieldName]: payload.value
    },
    editingStudentErrors: {
      ...state.editingStudentErrors,
      [payload.fieldName]: payload.fieldValidationResult
    }
  }
};

const handleResetEditingStudent = (state: EditState) => {
  return {
    ...state,
    editingStudent: new StudentView(),
    editingStudentErrors: new StudentErrors()
  }
}
