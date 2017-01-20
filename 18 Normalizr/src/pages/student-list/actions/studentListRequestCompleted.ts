import { actionsEnums } from "../../../common/actionsEnums";

// Former StudentEntity, ... later on add types, first level is easy, second
// dictionary not that easy
export const studentListRequestCompletedAction = (studentList: any) => {
  return {
    type: actionsEnums.FETCH_STUDENT_LIST_REQUEST_COMPLETED,
    payload: studentList
  };
};
