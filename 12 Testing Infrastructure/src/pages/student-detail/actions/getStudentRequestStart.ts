import {actionsEnums} from '../../../common/actionsEnums';
import {StudentEntity} from '../../../model/student';
import {studentApi} from '../../../rest-api/student-api';
import {getStudentRequestCompletedAction} from './getStudentRequestCompleted';

export const getStudentRequestStartAction = (studentId : number) => {
  return function(dispatcher) {
    const promise = studentApi.getStudentById(studentId);

    promise.then(
      data => {
        dispatcher(getStudentRequestCompletedAction(data));
      }
    );

    return promise;
  }
}
