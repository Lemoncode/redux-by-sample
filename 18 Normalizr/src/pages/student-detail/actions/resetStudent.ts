import { actionsEnums } from "../../../common/actionsEnums";

export const resetStudentAction = () => {
  return {
    type: actionsEnums.RESET_EDITING_STUDENT
  };
};
