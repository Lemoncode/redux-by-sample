import { Schema, arrayOf} from 'normalizr';

export const studentSchema = new Schema('students');
export const arrayOfStudentsSchema = arrayOf(studentSchema);
