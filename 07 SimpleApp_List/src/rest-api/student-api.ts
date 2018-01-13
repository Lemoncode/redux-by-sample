import { StudentEntity } from "../model/student";
import { studentsMockData } from "./mock-data";

class StudentApi {
  studentsData: StudentEntity[];

  constructor() {
    // Let"s the mockdata whenever the singleton is instatiated
    // and the play with the inmemory array
    this.studentsData = studentsMockData;

  }

  loadStudentList(): Promise<StudentEntity[]> {
    return Promise.resolve(this.studentsData);
  }
}

export const studentApi = new StudentApi();
