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
    if (student.id > 0) {
      this.updateStudent(student);
    } else {
      this.insertStudent(student);
    }

    return Promise.resolve(true);
  }

  private updateStudent(student: StudentEntity) {
    const index = this.studentsData.findIndex(st => st.id === student.id);

    // Just to ensure we get a new object (no mutability)
    this.studentsData = this.studentsData
    .slice(0, index)
    .concat([student])
    .concat(this.studentsData.slice(index + 1));
  }

  private insertStudent(student: StudentEntity) {
    const id = this.getNextId();
    student.id = id;

    this.studentsData = [...this.studentsData, student];
  }

  private getNextId(): number {
    const studentWithLastId = this.getStudentWithLastId();

    return studentWithLastId.id + 1;
  }

  private getStudentWithLastId(): StudentEntity {
    return this.studentsData.reduce((previousStudent, currentStudent) => {
      let studentWithLastId: StudentEntity = previousStudent;

      if (currentStudent.id > previousStudent.id) {
        studentWithLastId = currentStudent;
      }

      return studentWithLastId;
    });
  }
}

export const studentApi = new StudentApi();
