import { schema } from 'normalizr';
import { countrySchema } from './countrySchema';

export const studentSchema = new schema.Entity('students', {
  country: countrySchema
});
export const arrayOfStudentsSchema = [studentSchema];
