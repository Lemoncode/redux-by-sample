import { combineReducers } from 'redux';
import { byId, allIds} from './list';
import { edit } from './edit'

export const studentDomain = combineReducers({
  byId,
  allIds,
  edit
});

export const getStudent = (state, id) => state[id];
export const getIds = (state) => state;
