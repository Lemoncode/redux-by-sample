import { Schema, arrayOf} from 'normalizr';

export const countrySchema = new Schema('countries');
export const arrayOfCountriesSchema = arrayOf(countrySchema);
