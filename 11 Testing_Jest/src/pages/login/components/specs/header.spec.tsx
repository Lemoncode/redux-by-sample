import * as React from 'react';
const renderer: any = require('react-test-renderer');
import {Header} from '../header';

describe('header', () => {
  describe('#render', () => {
    it('renders correctly', () => {
      //Arrange

      //Act
      const component = renderer.create(
        <Header />
      ).toJSON();

      //Assert
      expect(component).toMatchSnapshot();
    });
  });
});
