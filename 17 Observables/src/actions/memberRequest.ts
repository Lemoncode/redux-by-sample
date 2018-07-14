import { actionsEnums } from "../common/actionsEnums";

export const memberRequest = () => {
  return {
    type: actionsEnums.MEMBER_REQUEST_STARTED,
  };
};
