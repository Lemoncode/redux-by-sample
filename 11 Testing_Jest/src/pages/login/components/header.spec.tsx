import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('Header', () => {
  it('should render as expected', () => {
    // Arrange

    // Act
    const component = shallow(
      <Header />,
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});
