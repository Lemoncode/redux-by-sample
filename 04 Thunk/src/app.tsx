import * as React from 'react';
import {HelloWorldContainer, 
        NameEditContainer, 
        ColorDisplayerContainer, 
        MembersAreaContainer,
        ColorPickerContainer} from './components';


export const App = () => {
  return (
    <div>
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
