import { StudentView } from "../../../model/view/studentView";

export const byId = (state : {[id: number] : StudentView} = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.students
    }
  }
  return state;
}
