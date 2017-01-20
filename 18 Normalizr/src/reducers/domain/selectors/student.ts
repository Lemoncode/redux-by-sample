import {createSelector} from 'reselect';
import {State} from '../../index';
import {Domain} from '../index';
import {StudentView} from '../../../model/view/studentView';
import {getCountry} from './country';

const domain = (state: State) => state.domain;

export const getStudents = createSelector(
  domain,
  (domain: Domain) =>
    domain.allIds.students.map(id => getStudent(domain, id))
);

const getStudent = (domain: Domain, id: number): StudentView => ({
  ...domain.byId.students[id],
  country: getCountry(domain, domain.byId.students[id].country)
});
