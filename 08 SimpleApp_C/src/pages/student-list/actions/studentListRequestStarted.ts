import {actionsEnums} from '../../../common/actionsEnums';
import {StudentEntity} from '../../../model/student';
import {studentApi} from '../../../rest-api/student-api';
import {studentListRequestCompletedAction} from './studentListRequestCompleted';
import { browserHistory } from 'react-router'

export const studentListRequestStartedAction = () => {
  return function(dispatcher) {
    const promise = studentApi.loadStudentList();

    promise.then(
      data => {
        dispatcher(studentListRequestCompletedAction(data));
      }

    );

    return promise;
  }
}
