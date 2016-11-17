import { expect } from 'chai';
import { StudentEntity } from '../../../../model/student';
import { getStudentRequestCompletedAction } from '../getStudentRequestCompleted'
import { actionsEnums } from '../../../../common/actionsEnums'

describe('pages/student/getStudentRequestCompleted Action', () => {
  it('StudentEntity informed', () => {
    // Arrange
    const student = new StudentEntity();

    student.id = 2;
    student.gotActiveTraining = false;
    student.fullname = "john doe";
    student.email = "email@mail.com";

    // Act
    const result = getStudentRequestCompletedAction(student);

    // Assert
    expect(result.type).to.be.equal(actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED);
    expect(result.payload.id).to.be.equal(student.id);
    expect(result.payload.gotActiveTraining).to.be.equal(student.gotActiveTraining);
    expect(result.payload.fullname).to.be.equal(student.fullname);
    expect(result.payload.email).to.be.equal(student.email)
  })
});
