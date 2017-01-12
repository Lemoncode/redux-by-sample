import { combineReducers } from 'redux';
import {byId} from './byId';
import {allIds} from './list';
import { edit, EditState } from './edit';
import { StudentView } from '../../../model/view/studentView';

export interface StudentDomain {
  byId: {[id: number] : StudentView},
  allIds: number[];
  edit: EditState;
};

export const studentDomain = combineReducers<StudentDomain>({
  byId,
  allIds,
  edit
});
