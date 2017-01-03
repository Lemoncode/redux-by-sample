import { combineReducers } from 'redux';
import { byId, allIds} from './list';
import { edit } from './edit'
import { StudentView } from '../../../model/view/studentView';
import { getCountry } from '../country/byId';

export const studentDomain = combineReducers({
  byId,
  allIds,
  edit
});

export const getStudent = (state, id) : StudentView => {
  return {
    ...state.studentDomain.byId[id],
    country: getCountry(state, state.studentDomain.byId[id].country)
  };
};
export const getIds = (state) => state;
