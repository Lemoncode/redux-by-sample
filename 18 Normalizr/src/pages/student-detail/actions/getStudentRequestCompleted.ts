import { actionsEnums } from "../../../common/actionsEnums";
import { StudentView } from "../../../model/view/studentView";

export const getStudentRequestCompletedAction = (student: StudentView) => {
  return {
    type: actionsEnums.FETCH_STUDENT_REQUEST_COMPLETED,
    payload: student,
  };
};
