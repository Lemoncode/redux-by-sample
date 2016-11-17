import * as React from "react";
import { HelloWorldContainer } from "./helloWorldContainer";
import { NameEditContainer } from "./nameEditContainer";

export const App = () => {
  return (
    <div>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
    </div>
  );
};
