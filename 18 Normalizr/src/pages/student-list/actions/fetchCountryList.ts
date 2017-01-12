import { normalize } from 'normalizr';
import { actionsEnums } from '../../../common/actionsEnums';
import { countryApi } from '../../../rest-api/country-api';
import {countryArraySchema} from '../../../schemas';
import {CountryView} from '../../../model/view/countryView';

export const fetchCountryListRequestStartedAction = () => (dispatcher) => {
  const promise = countryApi.fetchCountries();

  promise.then(
    data => {
      const normalizedCountries = normalize(data, countryArraySchema);
      dispatcher(fetchCountryListRequestCompletedAction(normalizedCountries));
    }
  );

  return promise;
}

export const fetchCountryListRequestCompletedAction = (countries) => ({
  type: actionsEnums.FETCH_COUNTRY_LIST_REQUEST_COMPLETED,
  payload: countries
});
