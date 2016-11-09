import {actionsEnums} from '../../../common/actionsEnums';
import { browserHistory } from 'react-router'

export const navigateToEditStudentAction = (studentId : number) => {
  return function(dispatcher) {
    browserHistory.push(`/student-detail/${studentId}`)
  }
}
