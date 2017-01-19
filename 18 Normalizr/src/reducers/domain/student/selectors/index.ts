import {createSelector} from 'reselect';
import {State} from '../../../index';
import {StudentDomain} from '../index';
import {StudentView} from '../../../../model/view/studentView';
import {CountryDomain} from '../../country';
import {countryDomain, getCountry} from '../../country/selectors';

const studentDomain = (state: State) => state.studentDomain;

export const getStudents = createSelector(
  studentDomain,
  countryDomain,
  (studentDomain: StudentDomain, countryDomain: CountryDomain) =>
    studentDomain.allIds.map(id => getStudent(studentDomain, countryDomain, id))
);

const getStudent = (studentDomain: StudentDomain, countryDomain: CountryDomain, id: number): StudentView => ({
  ...studentDomain.byId[id],
  country: getCountry(countryDomain, studentDomain.byId[id].country)
});
