import { combineReducers } from 'redux';
import {byId, ById} from './byId';
import {allIds, AllIds} from './list';

export interface Domain {
  byId: ById;
  allIds: AllIds;
}
export const domain =  combineReducers<Domain>({
  byId,
  allIds
});
