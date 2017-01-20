import { combineReducers } from 'redux';
import { session, SessionState } from './session';
import { student, StudentLogic } from './student';

export interface Logic {
  student: StudentLogic;
  session: SessionState
}
export const logic =  combineReducers<Logic>({
  student,
  session,
});
