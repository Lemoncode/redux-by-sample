import * as React from 'react';
import {HelloWorldContainer, NameEditContainer} from './components';

export const App = () => {
  return (
    <div>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
    </div>
  );
}
