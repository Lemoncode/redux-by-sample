import { normalize } from 'normalizr';
import { actionsEnums } from '../../../common/actionsEnums';
import { countryApi } from '../../../rest-api/country-api';
import {arrayOfCountriesSchema} from '../../../schemas/countrySchema';
import {CountryView} from '../../../model/view/countryView';

export const fetchCountryListRequestStartedAction = () => (dispatcher) => {
  const promise = countryApi.fetchCountries();dispatcher

  promise.then(
    data => {
      const countries = addInvalidCountryEntry(data);
      const normalizedCountries = normalize(countries, arrayOfCountriesSchema);
      dispatcher(fetchCountryListRequestCompletedAction(normalizedCountries));
    }
  );

  return promise;
}

const addInvalidCountryEntry = (countries: CountryView[]) => {
  return [{ id: 0, name: "Select country..." }, ...countries]
}

export const fetchCountryListRequestCompletedAction = (countries) => ({
  type: actionsEnums.FETCH_COUNTRY_LIST_REQUEST_COMPLETED,
  payload: countries
});
