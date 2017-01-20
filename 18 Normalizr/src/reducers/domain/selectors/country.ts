import {createSelector} from 'reselect';
import {State} from '../../index';
import {Domain} from '../index';
import {CountryView} from '../../../model/view/countryView';

const domain = (state: State) => state.domain;

export const getCountries = createSelector(
  domain,
  (state: Domain) => state.allIds.countries.map(id => getCountry(state, id))
);

export const getCountry = (state: Domain, id: number): CountryView => ({
  ...state.byId.countries[id]
});
