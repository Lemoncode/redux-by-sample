import { combineReducers } from 'redux';
import {byId} from './byId';
import {allIds} from './list';
import { CountryView } from '../../../model/view/countryView';

export interface CountryDomain {
  byId: {[id: number]: CountryView};
  allIds: number[];
}

export const countryDomain = combineReducers<CountryDomain>({
  byId,
  allIds
});
