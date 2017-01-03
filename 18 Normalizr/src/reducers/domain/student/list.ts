
import { actionsEnums } from "../../../common/actionsEnums";
import { StudentView } from "../../../model/view/studentView";
import { StudentErrors } from "../../../model/view/studentErrors";

export const byId = (state : {[id: number] : StudentView} = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.students
    }
  }
  return state;
}

export const allIds =  (state: Number[] = [], action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return action.payload.result;
  }
  return state;
};
