import {} from 'core-js'
import {actionsEnums} from '../../../common/actionsEnums';
import {StudentEntity} from '../../../model/student';
import {studentApi} from '../../../rest-api/student-api';
import {studentSaveRequestCompleted} from './studentSaveRequestCompleted';
import {FormValidationResult} from 'lc-form-validation';
import {loginFormValidation} from '../../login/login.validation';
import * as toastr from 'toastr';

export const studentSaveRequestStart = (student : StudentEntity) => {

  const saveStudent = (dispatcher, student : StudentEntity) : Promise<boolean> => {
    const promise = studentApi.saveStudent(student);

    promise.then(
      succeeded => {
        dispatcher(studentSaveRequestCompleted(succeeded));
        if(succeeded) {
          toastr.success("Student saved succesfully.")
        }
      }
    );

    return promise;
  }

  return function(dispatcher) {
    let promise = null;

    loginFormValidation.validateForm(student).then(
      (formValidationResult : FormValidationResult) => {
          if(formValidationResult.succeeded === true) {
            saveStudent(dispatcher, student);
          } else {
            toastr.error("Form failed to save, please review the fields content.")
          }
      }
    );

    return promise;
  }
}
