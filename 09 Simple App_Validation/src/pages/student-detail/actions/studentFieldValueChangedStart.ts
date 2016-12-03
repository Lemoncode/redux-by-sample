import { studentFormValidation } from "../student.validation";
import { FieldValidationResult } from "lc-form-validation";
import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";

export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any, event?: any) {
  return (dispatcher) => {
    studentFormValidation.validateField(viewModel, fieldName, value, event).then(
      (fieldValidationResult: FieldValidationResult) =>
        dispatcher(studentFieldValueChangedCompleted(fieldName, value, fieldValidationResult ))
    );
  };
}
