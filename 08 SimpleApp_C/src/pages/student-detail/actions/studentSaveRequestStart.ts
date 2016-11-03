import {actionsEnums} from '../../../common/actionsEnums';
import {StudentEntity} from '../../../model/student';
import {studentApi} from '../../../rest-api/student-api';
import {studentSaveRequestCompleted} from './studentSaveRequestCompleted';

export const studentSaveRequestStart = (student : StudentEntity) => {
  return function(dispatcher) {
    const promise = studentApi.saveStudent(student);

    promise.then(
      succeeded => {
        dispatcher(studentSaveRequestCompleted(succeeded));
      }
    );

    return promise;
  }
}
