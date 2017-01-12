import { actionsEnums } from "../../../common/actionsEnums";
import { studentApi } from "../../../rest-api/student-api";
import { studentListRequestCompletedAction } from "./studentListRequestCompleted";
import { normalize } from 'normalizr';
import { studentArraySchema } from '../../../schemas';

export const studentListRequestStartedAction = () => {
  return function(dispatcher) {
    const promise = studentApi.loadStudentList();

    promise.then(
      data => {
        const normalizedResult = normalize(data, studentArraySchema);
        dispatcher(studentListRequestCompletedAction(normalizedResult));
      }
    );

    return promise;
  };
};
