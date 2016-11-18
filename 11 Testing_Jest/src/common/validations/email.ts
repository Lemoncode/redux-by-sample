import {isEmail} from 'validator';
import { FieldValidationResult } from 'lc-form-validation';

// TODO: Harcoded strings and Id's isolate them in a config class
export const emailValidationHandler = (vm : any, value: any) : FieldValidationResult => {
  const isFieldValidEmail : boolean = isEmail(value);
  const errorInfo : string = (isFieldValidEmail) ? '' : 'Not a valid email';

  const fieldValidationResult : FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'EMAIL_NOT_VALID';
  fieldValidationResult.succeeded = isFieldValidEmail;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
}
