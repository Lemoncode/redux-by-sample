import { actionsEnums } from "../../../common/actionsEnums";
import { studentApi } from "../../../rest-api/student-api";
import { getStudentRequestCompletedAction } from "./getStudentRequestCompleted";
import { normalize } from 'normalizr'
import { studentSchema } from '../../../schema/schema'

export const getStudentRequestStartAction = (studentId: number) => {
  return function(dispatcher) {
    const promise = studentApi.getStudentById(studentId);

    promise.then(
      data => {
        console.log(
          'normalized response',
          normalize(data, studentSchema)
        );

        dispatcher(getStudentRequestCompletedAction(data));
      }
    );

    return promise;
  };
};
