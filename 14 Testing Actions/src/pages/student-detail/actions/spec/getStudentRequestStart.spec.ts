import { expect } from 'chai';
import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import {StudentEntity} from '../../../../model/student';
import {studentApi} from '../../../../rest-api/student-api';
import { getStudentRequestStartAction } from '../getStudentRequestStart'
import { getStudentRequestCompletedAction } from '../getStudentRequestCompleted'
import { actionsEnums } from '../../../../common/actionsEnums'



const middlewares = [ ReduxThunk ];
const mockStore = configureStore(middlewares);

describe('pages/login/getStudentRequestStart Action', () => {
  it('Student request succeeded', sinon.test((done) => {
    // Arrange
    const sinon : sinon.SinonStatic = this;
    const studentId = 1;

    const student : StudentEntity = new StudentEntity();
    student.id = 1;
    student.gotActiveTraining = true;
    student.fullname = "john doe";
    student.email = "john@mail.com";

    const getStudentByIdMethodStub = sinon.stub(studentApi, 'getStudentById');

    getStudentByIdMethodStub.returns({
      then: callback => {
        callback(student)
      }
    });


    // Act
    const store = mockStore([]);

    store.dispatch(getStudentRequestStartAction(studentId))
      .then(() => {
          // Assert
          expect(store.getActions()[0].type).to.be.equal(actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED);
          expect(store.getActions()[0].payload.id).to.be.equal(student.id);
          expect(store.getActions()[0].payload.gotActiveTraining).to.be.true;
          expect(store.getActions()[0].payload.fullname).to.be.equal(student.fullname);
          expect(store.getActions()[0].payload.email).to.be.equal(student.email);

          done();
      });
  }).bind(this));

});
