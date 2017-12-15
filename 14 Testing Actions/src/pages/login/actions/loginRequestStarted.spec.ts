import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import { hashHistory } from 'react-router'
import { loginApi } from '../../../rest-api/loginApi';
import { UserProfile } from '../../../model/userProfile'
import { LoginEntity } from '../../../model/login'
import { LoginResponse } from '../../../model/loginResponse'
import { loginRequestStartedAction } from './loginRequestStarted'
import { loginRequestCompletedAction } from './loginRequestCompleted'
import { actionsEnums } from '../../../common/actionsEnums'

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);


describe('pages/login/loginRequestStarted Action', () => {
  it('loginRequest login succeeded', (done) => {
    // Arrange
    const loginInfo: LoginEntity = new LoginEntity();
    loginInfo.login = "john";
    loginInfo.password = "pass";

    const expectedLoginResponse = new LoginResponse();
    expectedLoginResponse.succeeded = true;
    expectedLoginResponse.userProfile = new UserProfile();
    expectedLoginResponse.userProfile.fullname = "john";
    expectedLoginResponse.userProfile.role = "admin";


    const loginMethodStub = sinon.stub(loginApi, 'login');

    loginMethodStub.returns({
      then: callback => {
        callback(expectedLoginResponse)
      }
    });

    const hashHistoryStub = sinon.stub(hashHistory, 'push');


    // Act
    const store = mockStore([]);

    store.dispatch(loginRequestStartedAction(loginInfo))
      .then(() => {
        // Assert
        expect(store.getActions()[0].type).to.be.equal(actionsEnums.USERPROFILE_PERFORM_LOGIN);
        expect(store.getActions()[0].payload.succeeded).to.be.true;
        expect(hashHistoryStub.called).to.be.true;

        // Cleanup
        // To avoid this use sinon-test package
        loginMethodStub.restore();
        hashHistoryStub.restore();

        done();
      });
  });

  it('loginRequest login failed', (done) => {
    // Arrange
    const loginInfo: LoginEntity = new LoginEntity();
    loginInfo.login = "john";
    loginInfo.password = "pass";

    const expectedLoginResponse = new LoginResponse();
    expectedLoginResponse.succeeded = false;
    expectedLoginResponse.userProfile = new UserProfile();
    expectedLoginResponse.userProfile.fullname = "";
    expectedLoginResponse.userProfile.role = "";

    const loginMethodStub = sinon.stub(loginApi, 'login');

    loginMethodStub.returns({
      then: callback => {
        callback(expectedLoginResponse)
      }
    });

    const hashHistoryStub = sinon.stub(hashHistory, 'push');


    // Act
    const store = mockStore([]);

    store.dispatch(loginRequestStartedAction(loginInfo))
      .then(() => {
        // Assert
        expect(store.getActions()[0].type).to.be.equal(actionsEnums.USERPROFILE_PERFORM_LOGIN);
        expect(store.getActions()[0].payload.succeeded).to.be.false;
        expect(hashHistoryStub.called).to.be.false;

        // Cleanup
        // To avoid this use sinon-test package
        loginMethodStub.restore();
        hashHistoryStub.restore();

        done();
      });
  });

});
