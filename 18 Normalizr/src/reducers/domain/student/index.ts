import { combineReducers } from 'redux';
import { byId, allIds} from './list';
import { edit } from './edit'
import { StudentView } from '../../../model/view/studentView';

export const studentDomain = combineReducers({
  byId,
  allIds,
  edit
});

export const getStudent = (state, id) : StudentView => state[id];
export const getIds = (state) => state;
