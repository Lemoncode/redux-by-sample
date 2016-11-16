import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {studentReducer} from '../student';
import {} from 'mocha'
import {StudentEntity} from '../../model/student'
import {StudentErrors} from '../../model/studentErrors'


describe('studentReducer', () => {
  describe('#handleGetStudentList', () => {
    it('Store in reducer properly built list of students', () => {
      // Arrange
      const initialState = {
                            studentsList : [],
                            editingStudent : new StudentEntity(),
                            editingStudentErrors : new StudentErrors()
                           };

      deepFreeze(initialState);

      const studentA = new StudentEntity();

      studentA.id = 1;
      studentA.fullname = "john";

      const studentB = new StudentEntity();

      studentB.id = 2;
      studentB.fullname = "frank";


      const students = [
          studentA,
          studentB
      ];

      const action = {
        type: actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED,
        payload: students
      };


      // Act
      const finalState = studentReducer(initialState, action);

      // Assert
      expect(finalState.studentsList.length).to.be.equal(2);
      expect(finalState.studentsList[0].id).to.be.equal(studentA.id);
      expect(finalState.studentsList[0].fullname).to.be.equal(studentA.fullname);
      expect(finalState.studentsList[1].id).to.be.equal(studentB.id);
      expect(finalState.studentsList[1].fullname).to.be.equal(studentB.fullname);
    });

    it('Store in reducer an empty list of students', () => {
      // Arrange
      const initialState = {
                            studentsList : [],
                            editingStudent : new StudentEntity(),
                            editingStudentErrors : new StudentErrors()
                           };

      deepFreeze(initialState);


      const students = [];

      const action = {
        type: actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED,
        payload: students
      };


      // Act
      const finalState = studentReducer(initialState, action);

      // Assert
      expect(finalState.studentsList.length).to.be.equal(0);
    });

    it('Store in reducer an null list of students', () => {
      // Arrange
      const initialState = {
                            studentsList : [],
                            editingStudent : new StudentEntity(),
                            editingStudentErrors : new StudentErrors()
                           };

      deepFreeze(initialState);


      const students = null;

      const action = {
        type: actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED,
        payload: students
      };


      // Act
      const finalState = studentReducer(initialState, action);

      // Assert
      expect(finalState.studentsList).to.be.null;
    });


  });
});
