import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { sessionReducer } from './logic/session';
import { studentDomain, getStudent, getIds } from './domain/student';
import { StudentView } from '../model/view/studentView';
import { countryDomain } from './domain/country';

export const reducers =  combineReducers({
  studentDomain,
  sessionReducer,
  routing: routerReducer,
  countryDomain
});

export const getStudents = (state) : StudentView[] => {
  const ids = getIds(state.studentDomain.allIds);

  return ids.map(id => getStudent(state.studentDomain.byId, id))
}
