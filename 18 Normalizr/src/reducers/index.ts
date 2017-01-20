import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { sessionReducer, SessionState } from './logic/session';
import { studentDomain, StudentDomain } from './domain/student';
import { studentLogic, StudentLogic } from './logic/student';
import { StudentView } from '../model/view/studentView';
import { countryDomain, CountryDomain } from './domain/country';

export interface State {
  studentDomain: StudentDomain;
  studentLogic: StudentLogic;
  countryDomain: CountryDomain;
  sessionReducer: SessionState;
  routing: any;
}
export const reducers =  combineReducers<State>({
  studentDomain,
  studentLogic,
  countryDomain,
  sessionReducer,
  routing: routerReducer,
});
