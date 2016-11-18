import * as React from 'react';
import {create} from 'react-test-renderer';
import {Header} from '../header';

describe('header', () => {
  describe('#render', () => {
    it('renders correctly', () => {
      //Arrange

      //Act
      const component = create(
        <Header />,
        undefined
      ).toJSON();

      //Assert
      expect(component).toMatchSnapshot();
    });
  });
});
