import * as React from 'react';
const renderer: any = require('react-test-renderer');
import {Header} from '../header';

describe('header', () => {
  describe('#render', () => {
    it('renders as expected', () => {
      //Arrange

      //Act
      const tree = renderer.create(
        <Header />
      ).toJSON();

      //Assert
      expect(tree).toMatchSnapshot();
    });
  });
});
