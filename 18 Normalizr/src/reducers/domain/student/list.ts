
import { actionsEnums } from "../../../common/actionsEnums";
import { StudentEntity } from "../../../model/student";
import { StudentErrors } from "../../../model/studentErrors";

export const byId = (state : {[id : number] : StudentEntity} = {}, action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
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
