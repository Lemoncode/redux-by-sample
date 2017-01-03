import { Student } from '../api/student';
import { StudentView } from '../view/studentView';

class StudentMapper {
  mapStudentToStudentView(student: Student): StudentView {
    return {
      id: student.id,
      gotActiveTraining: student.gotActiveTraining,
      fullname: student.fullname,
      email: student.email,
      country: {
        id: student.countryId,
        name: ''
      }
    }
  }

  mapStudentListToStudentViewList(students: Student[]): StudentView[] {
    return students.map((student) => {
      return this.mapStudentToStudentView(student)
    });
  }
}

export const studentMapper = new StudentMapper();
