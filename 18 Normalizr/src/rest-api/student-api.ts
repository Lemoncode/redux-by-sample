import { Student } from "../model/api/student";
import { StudentView } from "../model/view/studentView";
import { studentsMockData } from "./mock-data";
import { } from "core-js";

class StudentApi {
  studentsData: Student[];

  constructor() {
    // Let"s the mockdata whenever the singleton is instatiated
    // and the play with the inmemory array
    this.studentsData = studentsMockData;
  }

  loadStudentList(): Promise<StudentView[]> {
    //TODO: Use mapper
    return Promise.resolve(this.studentsData);
  }

  getStudentById(id: number): Promise<StudentView> {
    //TODO: Use mapper
    const student = this.studentsData.find(st => st.id === id);
    return Promise.resolve(student);
  }

  saveStudent(student: StudentView): Promise<boolean> {
    //TODO: Use mapper
    if (student.id > 0) {
      this.updateStudent(student);
    } else {
      this.insertStudent(student);
    }

    return Promise.resolve(true);
  }

  private updateStudent(student: Student) {
    const index = this.studentsData.findIndex(st => st.id === student.id);

    // Just to ensure we get a new object (no mutability)
    this.studentsData = this.studentsData
    .slice(0, index)
    .concat([student])
    .concat(this.studentsData.slice(index + 1));
  }

  private insertStudent(student: Student) {
    const id = this.getNextId();
    student.id = id;

    this.studentsData = [...this.studentsData, student];
  }

  private getNextId(): number {
    const studentWithLastId = this.getStudentWithLastId();

    return studentWithLastId.id + 1;
  }

  private getStudentWithLastId(): Student {
    return this.studentsData.reduce((previousStudent, currentStudent) => {
      let studentWithLastId: Student = previousStudent;

      if (currentStudent.id > previousStudent.id) {
        studentWithLastId = currentStudent;
      }

      return studentWithLastId;
    });
  }
}

export const studentApi = new StudentApi();
