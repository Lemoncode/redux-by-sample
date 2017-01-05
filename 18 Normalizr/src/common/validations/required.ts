import { FieldValidationResult } from "lc-form-validation";
import { validationsEnums } from "../validationsEnums";

export const requiredValidationHandler = (vm: any, value: any): FieldValidationResult => {
  const isFieldInformed: boolean = (value != null && value.length > 0);
  const errorInfo: string = (isFieldInformed) ? "" : validationsEnums.REQUIRED.FIELD.MESSAGE;

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = validationsEnums.REQUIRED.FIELD.TYPE;
  fieldValidationResult.succeeded = isFieldInformed;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
};
