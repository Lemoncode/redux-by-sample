import * as React from "react";
import { HelloWorldContainer } from "./helloWorldContainer";
import { NameEditContainer } from "./nameEditContainer";
import { ColorDisplayerContainer } from "./colordisplayerContainer";
import { ColorPickerContainer } from "./colorpickerContainer";

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
};
