import * as React from "react";
import { MembersAreaContainer } from './components/members';
import { HelloWorldContainer } from "./components/helloworld";
import { NameEditContainer } from "./components/nameEdit";
import { ColorDisplayerContainer } from "./components/color";
import { ColorPickerContainer } from "./components/color";

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
};
