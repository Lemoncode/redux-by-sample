import { actionsEnums } from "../../../common/actionsEnums";
import { StudentView } from "../../../model/view/studentView";
import { studentApi } from "../../../rest-api/student-api";
import { studentSaveRequestCompleted } from "./studentSaveRequestCompleted";
import { FormValidationResult } from "lc-form-validation";
import { studentFormValidation } from "../student.validation";
import * as toastr from "toastr";

export const studentSaveRequestStart = (student: StudentView) => {

  const saveStudent = (dispatcher, student: StudentView): Promise<boolean> => {
    const promise = studentApi.saveStudent(student);

    promise.then(
      succeeded => {
        dispatcher(studentSaveRequestCompleted(succeeded));
        if (succeeded) {
          toastr.success("Student saved succesfully.");
        }
      }
    );

    return promise;
  };

  return function(dispatcher) {
    let promise = null;

    studentFormValidation.validateForm(student).then(
      (formValidationResult: FormValidationResult) => {
        if (formValidationResult.succeeded) {
          saveStudent(dispatcher, student);
        } else {
          toastr.error("Form failed to save, please review the fields content.");
        }
      }
    );

    return promise;
  };
};
