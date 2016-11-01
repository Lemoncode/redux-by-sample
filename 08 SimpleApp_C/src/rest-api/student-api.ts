import {StudentEntity} from '../model/student';
import {studentsMockData} from './mock-data';
import {} from 'core-js'

class StudentApi {
  studentsData : StudentEntity[];

  constructor() {
    // Let's the mockdata whenever the singleton is instatiated
    // and the play with the inmemory array
    this.studentsData = studentsMockData;

  }

  loadStudentList() : Promise<StudentEntity[]> {
      return Promise.resolve(this.studentsData);
  }

  getStudentById(id : number) : Promise<StudentEntity> {
    const student = this.studentsData.filter(function(student) {
        return student.id === id; // Filter out the appropriate one
    })[0];

    //const student = this.studentsData.find(st => st.id === id);

    return Promise.resolve(student);
  }
}

export const studentApi = new StudentApi();
