import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import {actionsEnums} from '../../common/actionsEnums';
import {studentReducer} from '../student';
import {} from 'mocha'
import {StudentEntity} from '../../model/student'
import {StudentErrors} from '../../model/studentErrors'
import {IStudentFieldValueChangedCompletedPayload} from '../../pages/student-detail/actions/studentFieldValueChangedCompleted'
import {FieldValidationResult} from 'lc-form-validation'

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

  describe('#handleGetStudent', () => {
    it('Store in reducer properly built student', () => {
      // Arrange
      const initialState = {
        studentsList : [],
        editingStudent : new StudentEntity(),
        editingStudentErrors : new StudentErrors()
      };

      const student = new StudentEntity();
      student.id = 1;
      student.gotActiveTraining = false;
      student.fullname = "john";
      student.email = "john@email.com"

      const action = {
        type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
        payload: student
      };

      // Act
      const finalState = studentReducer(initialState, action)

      // Assert
      expect(finalState.editingStudent.id).to.be.equal(student.id );
      expect(finalState.editingStudent.gotActiveTraining).to.be.equal(student.gotActiveTraining);
      expect(finalState.editingStudent.fullname).to.be.equal(student.fullname);
      expect(finalState.editingStudent.email).to.be.equal(student.email);
    });

    it('Store in reducer null student', () => {
      // Arrange
      const initialState = {
        studentsList : [],
        editingStudent : new StudentEntity(),
        editingStudentErrors : new StudentErrors()
      };

      const student = null;

      const action = {
        type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
        payload: student
      };

      // Act
      const finalState = studentReducer(initialState, action)

      // Assert
      expect(finalState.editingStudent).to.be.null;
    });

  });

  describe('#handleFieldValueChanged', () => {
    it('given an existing student in state update fullname no validation errors', () => {
      // Arrange
      const studentA = new StudentEntity();

      studentA.id = 1;
      studentA.fullname = "john";

      const initialState = {
                            studentsList : [],
                            editingStudent : studentA,
                            editingStudentErrors : new StudentErrors()
                           };

      deepFreeze(initialState);

      const newFullnameValue = 'johns';
      const fieldValidationResult = new FieldValidationResult();
      fieldValidationResult.key = 'fullname';
      fieldValidationResult.succeeded = true;

      const payload : IStudentFieldValueChangedCompletedPayload = {
         fieldName: 'fullname',
         value : newFullnameValue,
         fieldValidationResult : fieldValidationResult
      };

      const action = {
        type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
        payload: payload
      };

      // Act
      const finalState = studentReducer(initialState, action);

      // Assert
      expect(finalState.editingStudent.fullname).to.be.equal(newFullnameValue);
      expect(finalState.editingStudentErrors.fullname.succeeded).to.be.true;
    });

    it('given an existing student in state update fullname with validation errors', () => {
      // Arrange
      const studentA = new StudentEntity();

      studentA.id = 1;
      studentA.fullname = "john";

      const initialState = {
                            studentsList : [],
                            editingStudent : studentA,
                            editingStudentErrors : new StudentErrors()
                           };

      deepFreeze(initialState);

      const newFullnameValue = '';
      const fieldValidationResult = new FieldValidationResult();
      fieldValidationResult.key = 'fullname';
      fieldValidationResult.succeeded = false;
      fieldValidationResult.type = 'REQUIRED';
      fieldValidationResult.errorMessage = 'Required field';

      const payload : IStudentFieldValueChangedCompletedPayload = {
         fieldName: 'fullname',
         value : newFullnameValue,
         fieldValidationResult : fieldValidationResult
      };

      const action = {
        type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
        payload: payload
      };

      // Act
      const finalState = studentReducer(initialState, action);

      // Assert
      expect(finalState.editingStudent.fullname).to.be.equal(newFullnameValue);
      expect(finalState.editingStudentErrors.fullname.succeeded).to.be.false;
      expect(finalState.editingStudentErrors.fullname.type).to.be.equal('REQUIRED');
      expect(finalState.editingStudentErrors.fullname.errorMessage).to.be.equal('Required field');
    });

  });
});
