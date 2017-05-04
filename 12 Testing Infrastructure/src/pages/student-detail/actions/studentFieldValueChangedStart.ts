import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";
import { studentFormValidation } from '../student.validation'

export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any) {
  return (dispatcher) => {
    studentFormValidation.validateField(viewModel, fieldName, value).then(
        (fieldValidationResult) => dispatcher(studentFieldValueChangedCompleted(fieldName, value, fieldValidationResult))
    );
  };
}
