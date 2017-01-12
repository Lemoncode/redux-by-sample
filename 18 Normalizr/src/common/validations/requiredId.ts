import { FieldValidationResult } from "lc-form-validation";
import { validationsEnums } from "../validationsEnums";

export const requiredIdValidationHandler = (vm: any, value: {id: number}): FieldValidationResult => {
  const isFieldInformed: boolean = (value != null && value.id && value.id > 0);
  const errorInfo: string = (isFieldInformed) ? "" : validationsEnums.REQUIRED.FIELD.MESSAGE;

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = validationsEnums.REQUIRED.FIELD.TYPE;
  fieldValidationResult.succeeded = isFieldInformed;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
};
