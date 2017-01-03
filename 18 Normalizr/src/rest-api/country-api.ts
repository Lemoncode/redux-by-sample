import { Country } from '../model/api/country';
import { CountryView } from '../model/view/countryView';
import { countriesMockData } from './mock-data';
import { countryMapper } from '../model/mappers/countryMapper';

class CountryApi {
  countriesData: Country[];

  constructor() {
    this.countriesData = countriesMockData;
  }

  fetchCountries(): Promise<CountryView[]> {
    const countryViewList = countryMapper
      .mapCountryListToCountryViewList(this.countriesData);

    return Promise.resolve(countryViewList);
  }
}

export const countryApi = new CountryApi();
