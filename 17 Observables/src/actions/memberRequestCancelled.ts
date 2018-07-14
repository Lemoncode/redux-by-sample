import { actionsEnums } from "../common/actionsEnums";

export const memberRequestCancelled = () => {
  return {
    type: actionsEnums.MEMBER_REQUEST_CANCELLED,
  };
};
