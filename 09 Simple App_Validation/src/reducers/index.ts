import { combineReducers } from "redux";
import { sessionReducer } from "./session";
import { studentReducer} from "./student";
import { routerReducer } from "react-router-redux";

export const reducers =  combineReducers({
  sessionReducer,
  studentReducer,
  routing: routerReducer
});
