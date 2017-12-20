import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LoginEntity } from '../../../model/login';
import * as loginRequestActions from '../actions/loginRequestStarted';
import * as updateLoginActions from '../actions/updateEditingLogin';
import {LoginComponent} from '../login';
import {LoginContainer} from '../loginContainer';

const createStore = configureStore();

describe('LoginContainer', () => {
  it('Should render LoginComponent with loginInfo', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    // Assert
    expect(loginComponentWrapper).toBeDefined();
    expect(loginComponentWrapper.prop('loginInfo')).toBeDefined();
    expect(loginComponentWrapper.prop('loginInfo').login).toEqual(loginInfo.login);
    expect(loginComponentWrapper.prop('loginInfo').password).toEqual(loginInfo.password);
  });

  it('Should calls to updateEditingLogin when simulate onChange email', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const updateEditingLoginMock = jest.spyOn(updateLoginActions, 'updateEditingLogin');
    updateEditingLoginMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const inputEmail = loginComponentWrapper.find('.form-control').find('[name="email"]');
    inputEmail.simulate('change');

    // Assert
    expect(updateEditingLoginMock).toHaveBeenCalled();
    expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
  });

  it('Should calls to updateEditingLogin when simulate onChange password', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const updateEditingLoginMock = jest.spyOn(updateLoginActions, 'updateEditingLogin');
    updateEditingLoginMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const inputPassword = loginComponentWrapper.find('.form-control').find('[name="password"]');
    inputPassword.simulate('change');

    // Assert
    expect(updateEditingLoginMock).toHaveBeenCalled();
    expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
  });

  it('Should calls to loginRequestStartedAction when simulate button click', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = "test login";
    loginInfo.password = "test password";

    const mockStore: any = createStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const loginRequestStartedMock = jest.spyOn(loginRequestActions, 'loginRequestStartedAction');
    loginRequestStartedMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const loginButton = loginComponentWrapper.find('input[type="button"]');
    loginButton.simulate('click');

    // Assert
    expect(loginRequestStartedMock).toHaveBeenCalled();
    expect(loginRequestStartedMock).toHaveBeenCalledWith(loginInfo);
  });
});