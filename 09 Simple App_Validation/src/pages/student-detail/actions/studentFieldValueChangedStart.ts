import { studentFormValidation } from "../student.validation";
import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";

export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any) {
  return (dispatcher) => {
    studentFormValidation.validateField(viewModel, fieldName, value, event).then(
      dispatcher(studentFieldValueChangedCompleted(fieldName, value ))
    );
  };
}
