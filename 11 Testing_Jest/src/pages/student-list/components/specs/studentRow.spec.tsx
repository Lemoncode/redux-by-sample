import * as React from 'react';
import {create, ReactTestRendererJSON} from 'react-test-renderer';
import { StudentEntity } from '../../../../model/student';
import {StudentRowComponent} from '../studentRow';

describe('StudentRowComponent', () => {
  it('Should render a row with a given name and email', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = "John Doe";
    student.email = "john@email.com";

    // Act
    const component = create(
      <StudentRowComponent
        student={student}
        editStudent={() => {}}
      />
    ).toJSON();

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('Should interact to the click on edit student and returns as param 2 student Id', () => {
    // Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = "John Doe";
    student.email = "john@email.com";

    const onEditStudentMock = jest.fn();

    // Act
    const component = create(
      <StudentRowComponent
        student={student}
        editStudent={onEditStudentMock}
      />
    ).toJSON();

    const tdContainingButton = component.children[3] as ReactTestRendererJSON;
    const button: any = tdContainingButton.children[0];

    button.props.onClick();

    // Assert
    expect(component).toMatchSnapshot();
    expect(onEditStudentMock).toHaveBeenCalled();
    expect(onEditStudentMock).toHaveBeenCalledWith(student.id);
  });
});
