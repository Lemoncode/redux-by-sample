import { actionsEnums } from "../../../common/actionsEnums";
import { FieldValidationResult } from "lc-form-validation";

interface IStudentFieldValueChangedCompletedPayload {
  fieldName: string;
  value: any;
  fieldValidationResult: FieldValidationResult;
}

const studentFieldValueChangedCompleted = (fieldName: string, value: string, fieldValidationResult: FieldValidationResult) => {
  return {
    type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
    payload: {
      fieldName,
      value,
      fieldValidationResult
    } as IStudentFieldValueChangedCompletedPayload
  };
};

export {
  IStudentFieldValueChangedCompletedPayload,
  studentFieldValueChangedCompleted
}