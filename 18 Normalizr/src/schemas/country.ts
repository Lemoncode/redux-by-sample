import { schema } from 'normalizr';

export const countrySchema = new schema.Entity('countries');
export const countryArraySchema = [countrySchema];
