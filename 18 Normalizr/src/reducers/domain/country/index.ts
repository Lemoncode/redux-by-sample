import { combineReducers } from 'redux';
import {byId} from './byId';
import {allIds} from './list';
import { CountryNormalized } from '../../../model/normalized/countryNormalized';

export interface CountryDomain {
  byId: {[id: number]: CountryNormalized};
  allIds: number[];
}

export const countryDomain = combineReducers<CountryDomain>({
  byId,
  allIds
});
