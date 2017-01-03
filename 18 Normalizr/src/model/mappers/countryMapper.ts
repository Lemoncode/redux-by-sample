import { Country } from '../api/country';
import { CountryView } from '../view/countryView';

class CountryMapper {
  mapCountryToCountryView(country: Country): CountryView {
    return {
      id: country.id,
      name: country.name
    }
  }

  mapCountryListToCountryViewList(countrys: Country[]): CountryView[] {
    return countrys.map((country) => {
      return this.mapCountryToCountryView(country)
    });
  }
}

export const countryMapper = new CountryMapper();
