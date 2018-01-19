import * as React from 'react';
import { shallow } from 'enzyme';
import { StudentEntity } from '../../../model/student';
import { StudentRowComponent } from './studentRow';

describe('StudentRowComponent', () => {
  it('should render as expect passing student with gotActiveTraining equals true', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = 'test name';
    student.email = 'test email';

    const editStudent = () => { };

    // Act
    const component = shallow(
      <StudentRowComponent
        student={student}
        editStudent={editStudent}
      />,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should render as expect passing student with gotActiveTraining equals false', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = false;
    student.fullname = 'test name';
    student.email = 'test email';

    const editStudent = () => { };

    // Act
    const component = shallow(
      <StudentRowComponent
        student={student}
        editStudent={editStudent}
      />,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to editStudent with studentId as parameter whenclick on button', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = false;
    student.fullname = 'test name';
    student.email = 'test email';

    const editStudent = jest.fn();

    // Act
    const component = shallow(
      <StudentRowComponent
        student={student}
        editStudent={editStudent}
      />,
    );

    component.find('span.btn').simulate('click');

    // Assert
    expect(editStudent).toHaveBeenCalled();
    expect(editStudent).toHaveBeenCalledWith(student.id);
  });
});
