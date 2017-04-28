import { actionsEnums } from "../../../common/actionsEnums";

export const studentSaveRequestCompletedAction = (succeeded: boolean) => {
  return {
    type: actionsEnums.STUDENT_SAVE_COMPLETED,
    payload: succeeded,
  };
};
