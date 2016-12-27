import {isEmail} from "validator";
import { FieldValidationResult } from "lc-form-validation";
import { validationsEnums } from "../validationsEnums";

export const emailValidationHandler = (vm: any, value: any): FieldValidationResult => {
  const isFieldValidEmail: boolean = isEmail(value);
  const errorInfo: string = (isFieldValidEmail) ? "" : validationsEnums.EMAIL.NOT_VALID.MESSAGE;

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = validationsEnums.EMAIL.NOT_VALID.TYPE;
  fieldValidationResult.succeeded = isFieldValidEmail;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
};
