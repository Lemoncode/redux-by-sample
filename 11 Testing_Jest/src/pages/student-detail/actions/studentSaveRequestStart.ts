import { actionsEnums } from "../../../common/actionsEnums";
import { StudentEntity } from "../../../model/student";
import { studentApi } from "../../../rest-api/student-api";
import { studentSaveRequestCompletedAction } from "./studentSaveRequestCompleted";
import * as toastr from "toastr";
import { FormValidationResult } from 'lc-form-validation'
import { studentFormValidation } from '../student.validation'

export const studentSaveRequestStart = (student: StudentEntity) => {

    const saveStudent = (dispatcher, student: StudentEntity): Promise<boolean> => {
      const promise = studentApi.saveStudent(student);

      promise.then(
        succeeded => {
          dispatcher(studentSaveRequestCompletedAction(succeeded));
          if (succeeded) {
            toastr.success("Student saved succesfully.");
          }
        }
      );

      return promise;
    }


  return function(dispatcher) {
      let promise = null;

      studentFormValidation.validateForm(student).then(
        (formValidationResult: FormValidationResult) => {
          if (formValidationResult.succeeded === true) {
            saveStudent(dispatcher, student);
          } else {
            toastr.error("Form failed to save, please review the fields content.");
          }
        }
      );

    return promise;
  };
};



