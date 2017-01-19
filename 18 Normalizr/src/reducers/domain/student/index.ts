import { combineReducers } from 'redux';
import {byId} from './byId';
import {allIds} from './list';
import { edit, EditState } from './edit';
import { StudentNormalized } from '../../../model/normalized/studentNormalized';

export interface StudentDomain {
  byId: {[id: number] : StudentNormalized},
  allIds: number[];
  edit: EditState;
};

export const studentDomain = combineReducers<StudentDomain>({
  byId,
  allIds,
  edit
});
