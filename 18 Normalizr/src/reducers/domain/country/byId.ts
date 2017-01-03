import { CountryView } from '../../../model/view/countryView';

export const byId = (state: {[id: number]: CountryView} = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.countries
    }
  }

  return state;
}

export const getCountry = (state, id): CountryView => {
  return {
    ...state.countryDomain.byId[id]
  }
};
