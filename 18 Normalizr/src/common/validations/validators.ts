import { FieldValidationResult } from "lc-form-validation";

// TODO: Harcoded strings and Id's isolate them in a config class
export const requiredValidationHandler = (vm: any, value: any): FieldValidationResult => {
  const isFieldInformed: boolean = (value != null && value.length > 0);
  const errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = "REQUIRED";
  fieldValidationResult.succeeded = isFieldInformed;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
};
