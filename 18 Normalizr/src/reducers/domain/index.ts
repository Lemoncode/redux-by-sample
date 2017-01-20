import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { student, StudentDomain } from './student';
import { country, CountryDomain } from './country';

export interface Domain {
  student: StudentDomain;
  country: CountryDomain;
}
export const domain =  combineReducers<Domain>({
  student,
  country,
});
