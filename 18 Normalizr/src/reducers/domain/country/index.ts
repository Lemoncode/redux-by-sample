import { combineReducers } from 'redux';
import { byId, getCountry } from './byId';
import { allIds, getIds } from './list';
import { CountryView } from '../../../model/view/countryView';

export const countryDomain = combineReducers({
  byId,
  allIds
});

export const getCountries = (state) : CountryView[] => {
  const ids = getIds(state.countryDomain.allIds);
  return ids.map(id => getCountry(state.countryDomain.byId, id));
}
