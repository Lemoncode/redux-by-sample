import { actionsEnums } from "../../../common/actionsEnums";
import { StudentEntity } from "../../../model/student";

// Former StudentEntity, ... later on add types, first level is easy, second
// dictionary not that easy
export const studentListRequestCompletedAction = (studentList: any) => {
  return {
    type: actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED,
    payload: studentList
  };
};
