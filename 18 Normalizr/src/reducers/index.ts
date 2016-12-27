import { combineReducers } from "redux";
import { sessionReducer } from "./logic/session";
import { studentDomain, getStudent, getIds } from "./domain/student";
import { routerReducer } from "react-router-redux";


export const reducers =  combineReducers({
  studentDomain,
  sessionReducer,
  routing: routerReducer
});

export const getStudents = (state) => {
  const ids = getIds(state.studentDomain.allIds);

  return ids.map(id => getStudent(state.studentDomain.byId, id))
}
