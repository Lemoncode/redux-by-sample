import { actionsEnums } from "../../../common/actionsEnums";
import { StudentEntity } from "../../../model/student";
import { studentApi } from "../../../rest-api/student-api";
import { studentListRequestCompletedAction } from "./studentListRequestCompleted";
import { normalize } from 'normalizr'
import { arrayOfStudentsSchema } from '../../../schema/schema'

export const studentListRequestStartedAction = () => {
  return function(dispatcher) {
    const promise = studentApi.loadStudentList();

    promise.then(
      data => {
        const normalizedResult = normalize(data, arrayOfStudentsSchema);
        dispatcher(studentListRequestCompletedAction(normalizedResult));
      }
    );

    return promise;
  };
};
