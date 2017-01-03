import { Student } from '../model/api/student';
import { StudentView } from '../model/view/studentView';

class StudentMapper {
  mapStudentToStudentView(student: Student): StudentView {
    return {
      id: student.id,
      gotActiveTraining: student.gotActiveTraining,
      fullname: student.fullname,
      email: student.email
    }
  }

  mapStudentListToStudentViewList(students: Student[]): StudentView[] {
    return students.map((student) => {
      return this.mapStudentToStudentView(student)
    });
  }
}

export const studentMapper = new StudentMapper();
