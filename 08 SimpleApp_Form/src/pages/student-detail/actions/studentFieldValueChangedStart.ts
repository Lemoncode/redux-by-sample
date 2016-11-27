import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";

export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any) {
  return (dispatcher) => {
    // This will change when we add validations to this action
    dispatcher(studentFieldValueChangedCompleted(fieldName, value ));
  };
}
