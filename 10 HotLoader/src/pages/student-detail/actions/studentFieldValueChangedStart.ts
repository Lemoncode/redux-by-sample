import {studentFieldValueChangedCompleted} from './studentFieldValueChangedCompleted';
import {FieldValidationResult} from 'lc-form-validation'
import { studentFormValidation} from '../student.validation';

export function studentFieldValueChangedStart(viewModel : any, fieldName : string, value: any, event? : any) {

    return (dispatcher) => {
      studentFormValidation.validateField(viewModel, fieldName, value, event).then(
        (fieldValidationResult : FieldValidationResult) => dispatcher(studentFieldValueChangedCompleted(fieldName, value, fieldValidationResult ))
      );
    }
}
