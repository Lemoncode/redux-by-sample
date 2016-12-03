import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";
import { FieldValidationResult } from "lc-form-validation";
import { loginFormValidation } from "../pages/login/login.validation";

export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any, event?: any) {
  return (dispatcher) => {
    loginFormValidation.validateField(viewModel, fieldName, value, event).then(
      (fieldValidationResult: FieldValidationResult) => dispatcher(studentFieldValueChangedCompleted(fieldName, value, fieldValidationResult ))
    );
  };
}
