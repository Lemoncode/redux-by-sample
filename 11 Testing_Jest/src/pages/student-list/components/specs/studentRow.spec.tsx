import * as React from 'react';
const renderer: any = require('react-test-renderer');
import {StudentRowComponent} from '../studentRow';
import { StudentEntity } from '../../../../model/student';

describe('StudentRowComponent', () => {
  it('Should render a row with a given name and email', () => {
    //Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = "John Doe";
    student.email = "john@email.com";

    //Act
    const tree = renderer.create(
      <StudentRowComponent
        student={student}
        editStudent={() => {}}
       />
    ).toJSON();

    //Assert
    expect(tree).toMatchSnapshot();
  });

  it('Should interact to the click on edit student and returns as param 2 student Id', () => {
    //Arrange
    const student = new StudentEntity();
    student.id = 2;
    student.gotActiveTraining = true;
    student.fullname = "John Doe";
    student.email = "john@email.com";

    const onEditStudentMock = jest.fn();

    //Act
    const tree = renderer.create(
      <StudentRowComponent
        student={student}
        editStudent={onEditStudentMock}
       />
    ).toJSON();

    const tdContainingDivClickable = tree.children[3];
    const divClickable = tdContainingDivClickable.children[0];

    divClickable.props.onClick();

    //Assert
    expect(tree).toMatchSnapshot();
    expect(onEditStudentMock).toHaveBeenCalled();
    expect(onEditStudentMock).toHaveBeenCalledWith(student.id);
  });
});
