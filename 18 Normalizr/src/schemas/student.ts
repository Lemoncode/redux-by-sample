import {schema} from 'normalizr';
import {countrySchema} from './country';

export const studentSchema = new schema.Entity('students', {
  country: countrySchema
});
export const studentArraySchema = [studentSchema];
