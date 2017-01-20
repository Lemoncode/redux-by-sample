import { combineReducers } from 'redux';
import { edit, EditState } from './edit';

export interface Student {
  edit: EditState;
};

export const student = combineReducers<Student>({
  edit
});
