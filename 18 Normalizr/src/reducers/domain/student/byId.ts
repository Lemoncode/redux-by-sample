import { StudentNormalized } from "../../../model/normalized/studentNormalized";

export const byId = (state : {[id: number] : StudentNormalized} = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.students
    }
  }
  return state;
}
