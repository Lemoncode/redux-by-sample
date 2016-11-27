import { actionsEnums } from "../../../common/actionsEnums";

export const getStudentRequestCompletedAction = (succeeded: boolean) => {
  return {
    type: actionsEnums.STUDENT_SAVE_COMPLETED,
    payload: succeeded,
  };
};
