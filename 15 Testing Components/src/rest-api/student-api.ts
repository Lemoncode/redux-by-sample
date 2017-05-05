import { StudentEntity } from "../model/student";
import { studentsMockData } from "./mock-data";
import { } from "core-js";

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

  getStudentById(id: number): Promise<StudentEntity> {
    const student = this.studentsData.find(st => st.id === id);
    return Promise.resolve(student);
  } 

  saveStudent(student: StudentEntity): Promise<boolean> {
    const index = this.studentsData.findIndex(st => st.id === student.id);

    // Just to ensure we get a new object (no mutability)
    this.studentsData = this.studentsData
    .slice(0, index)
    .concat([student])
    .concat(this.studentsData.slice(index + 1));

    return Promise.resolve(true);
  }    
}

export const studentApi = new StudentApi();
