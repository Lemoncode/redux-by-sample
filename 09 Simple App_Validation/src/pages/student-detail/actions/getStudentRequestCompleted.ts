import { actionsEnums } from '../../../common/actionsEnums';
import { StudentEntity } from '../../../model/student';

export const getStudentRequestCompletedAction = (student : StudentEntity) => {
  return {
    type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
    payload: student
  }
}
