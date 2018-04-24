import * as React from 'react';
import {HelloWorldContainer, NameEditContainer, ColorDisplayerContainer, ColorPickerContainer} from './components';

export const App = () => {
  return (
    <div>
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
