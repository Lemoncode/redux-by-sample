import * as React from 'react';
import { create } from 'react-test-renderer';
import { Header } from '../header';

describe('Header', () => {
  it('renders as expected', () => {
    // Arrange

    // Act
    const component = create(
      <Header />
    ).toJSON();

    // Assert
    expect(component).toMatchSnapshot();
  });
});
