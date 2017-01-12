import { actionsEnums } from "../../../common/actionsEnums";

export const allIds =  (state: Number[] = [], action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return action.payload.result;
  }
  return state;
};
