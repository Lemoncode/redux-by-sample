import * as React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LoginEntity } from '../../../model/login';
import { updateEditingLogin } from '../actions/updateEditingLogin';
import { loginRequestStartedAction } from '../actions/loginRequestStarted';
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

    const actions = {
      updateEditingLogin: jest.fn(),
    };

    // Act
    const loginContainerWrapper = mount(
      <Provider store={mockStore}>
        <LoginContainer />
      </Provider>
    );

    const loginComponentWrapper = loginContainerWrapper.find(LoginComponent);

    const inputEmail = loginComponentWrapper.find('.form-control').find('[name="email"]');
    inputEmail.simulate('change');

    // Assert
    expect(actions.updateEditingLogin).toHaveBeenCalled();
  });
});