import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {byId, ById} from './byId';
import {allIds, AllIds} from './list';
import { StudentNormalized } from '../../model/normalized/studentNormalized';
import { CountryNormalized } from '../../model/normalized/countryNormalized';

export interface Domain {
  byId: ById;
  allIds: AllIds;
}
export const domain =  combineReducers<Domain>({
  byId,
  allIds
});
