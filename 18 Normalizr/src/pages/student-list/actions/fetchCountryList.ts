import { normalize, NormalizeOutput } from 'normalizr';
import { actionsEnums } from '../../../common/actionsEnums';
import { countryApi } from '../../../rest-api/country-api';
import {arrayOfCountriesSchema} from '../../../schemas/countrySchema';

export const fetchCountryListRequestStartedAction = () => (dispatcher) => {
  const promise = countryApi.fetchCountries();dispatcher

  promise.then(
    data => {
      const normalizedCountries = normalize(data, arrayOfCountriesSchema);
      dispatcher(fetchCountryListRequestCompletedAction(normalizedCountries));
    }
  );

  return promise;
}

export const fetchCountryListRequestCompletedAction = (countries: NormalizeOutput) => ({
  type: actionsEnums.FETCH_COUNTRY_LIST_REQUEST_COMPLETED,
  payload: countries
});
