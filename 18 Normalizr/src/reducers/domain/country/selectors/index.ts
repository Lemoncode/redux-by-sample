import {createSelector} from 'reselect';
import {State} from '../../../index';
import {CountryDomain} from '../index';
import {CountryView} from '../../../../model/view/countryView';

export const countryDomain = (state: State) => state.domain.country;

export const getCountries = createSelector(
  countryDomain,
  (state: CountryDomain) => state.allIds.map(id => getCountry(state, id))
);

export const getCountry = (state: CountryDomain, id: number): CountryView => ({
  ...state.byId[id]
});
