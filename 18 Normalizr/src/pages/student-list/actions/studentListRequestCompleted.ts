import { actionsEnums } from "../../../common/actionsEnums";
import { StudentEntity } from "../../../model/student";

export const studentListRequestCompletedAction = (studentList: StudentEntity[]) => {
  return {
    type: actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED,
    payload: studentList
  };
};
