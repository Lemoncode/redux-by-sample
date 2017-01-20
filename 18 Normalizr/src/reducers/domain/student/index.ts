import { combineReducers } from 'redux';
import {byId} from './byId';
import {allIds} from './list';
import { StudentNormalized } from '../../../model/normalized/studentNormalized';

export interface StudentDomain {
  byId: {[id: number] : StudentNormalized},
  allIds: number[];
};

export const studentDomain = combineReducers<StudentDomain>({
  byId,
  allIds
});
