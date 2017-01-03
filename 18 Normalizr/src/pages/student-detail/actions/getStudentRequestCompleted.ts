import { actionsEnums } from "../../../common/actionsEnums";
import { StudentView } from "../../../model/view/studentView";

export const getStudentRequestCompletedAction = (student: StudentView) => {
  return {
    type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
    payload: student,
  };
};
