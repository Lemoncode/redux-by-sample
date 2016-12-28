import { combineReducers } from 'redux';
import { byId, allIds} from './list';
import { edit } from './edit'
import { StudentEntity } from '../../../model/student'

export const studentDomain = combineReducers({
  byId,
  allIds,
  edit
});

export const getStudent = (state, id) : StudentEntity => state[id];
export const getIds = (state) => state;
