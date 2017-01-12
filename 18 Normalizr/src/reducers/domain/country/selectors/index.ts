import {createSelector} from 'reselect';
import {State} from '../../../index';
import {CountryDomain} from '../index';

export const countryDomain = (state: State) => state.countryDomain;

export const getCountries = createSelector(
  countryDomain,
  (state: CountryDomain) => state.allIds.map(id => getCountry(state, id))
);

export const getCountry = (state: CountryDomain, id) => ({
  ...state.byId[id]
});
