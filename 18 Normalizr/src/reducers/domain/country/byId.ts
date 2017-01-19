import { CountryNormalized } from '../../../model/normalized/countryNormalized';

export const byId = (state: {[id: number]: CountryNormalized} = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.countries
    }
  }

  return state;
}
