import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

import { LoginEntity } from '../../model/login';
import { LoginContainer } from './loginContainer';
import * as updateEditingLoginActions from './actions/updateEditingLogin';
import * as loginRequestActions from './actions/loginRequestStarted';

describe('LoginContainer', () => {
  it('should render a LoginComponent with loginInfo property informed', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = 'test login';
    loginInfo.password = 'test password';

    const store = mockStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    // Act
    const component = mount(
      <Provider store={store}>
        <LoginContainer />
      </Provider>,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to updateEditingLogin when simulate onChange email', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = 'test login';
    loginInfo.password = 'test password';

    const store = mockStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    const updateEditingLoginMock = jest.spyOn(updateEditingLoginActions, 'updateEditingLogin');
    updateEditingLoginMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    // Act
    const component = mount(
      <Provider store={store}>
        <LoginContainer />
      </Provider>,
    );

    component.find('input [name="email"]').simulate('change');

    // Assert
    expect(updateEditingLoginMock).toHaveBeenCalled();
    expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
  });

  it('should call to updateEditingLogin when simulate onChange password', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = 'test login';
    loginInfo.password = 'test password';

    const store = mockStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    const updateEditingLoginMock = jest.spyOn(updateEditingLoginActions, 'updateEditingLogin');
    updateEditingLoginMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    // Act
    const component = mount(
      <Provider store={store}>
        <LoginContainer />
      </Provider>,
    );

    component.find('input [name="password"]').simulate('change');

    // Assert
    expect(updateEditingLoginMock).toHaveBeenCalled();
    expect(updateEditingLoginMock).toHaveBeenCalledWith(loginInfo);
  });

  it('should call to loginRequestStartedAction when simulate button click', () => {
    // Arrange
    const loginInfo = new LoginEntity();
    loginInfo.login = 'test login';
    loginInfo.password = 'test password';

    const store = mockStore({
      sessionReducer: {
        editingLogin: loginInfo,
      },
    });

    const loginRequestStartedActionMock = jest.spyOn(loginRequestActions, 'loginRequestStartedAction');
    loginRequestStartedActionMock.mockImplementation(() => ({
      type: 'dummy',
    }));

    // Act
    const component = mount(
      <Provider store={store}>
        <LoginContainer />
      </Provider>,
    );

    component.find('input [type="button"]').simulate('click');

    // Assert
    expect(loginRequestStartedActionMock).toHaveBeenCalled();
  });
});
