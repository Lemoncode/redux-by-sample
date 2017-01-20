import { combineReducers } from 'redux';
import { session, Session } from './session';
import { student, Student } from './student';

export interface Logic {
  student: Student;
  session: Session
}
export const logic =  combineReducers<Logic>({
  student,
  session,
});
