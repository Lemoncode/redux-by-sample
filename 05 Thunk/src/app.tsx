import * as React from 'react';
import {HelloWorldContainer} from './components/helloworld'
import {NameEditContainer} from './components/nameEdit';
import {ColorDisplayerContainer, ColorPickerContainer} from './components/color';
import {MembersAreaContainer} from './components/members';

export const App = () => {
  return (
    <div className="container">
      <MembersAreaContainer/>
      <br/>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
      <br/>
      <ColorDisplayerContainer/>
      <br/>
      <ColorPickerContainer/>
    </div>
  );
}
