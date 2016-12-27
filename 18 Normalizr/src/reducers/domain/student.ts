import { combineReducers } from 'redux';
import { actionsEnums } from "../../common/actionsEnums";
import objectAssign = require("object-assign");
import { StudentEntity } from "../../model/student";
import { StudentErrors } from "../../model/studentErrors";


const byId = (state = {}, action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return objectAssign({}, state, action.payload.entities.students);
  }
  return state;
}


const allIds =  (state: any = [], action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return action.payload.result;
  }
  return state;
};

export const studentDomain = combineReducers({
  byId,
  allIds
});

export const getStudent = (state, id) => state[id];
export const getIds = (state) => state;
