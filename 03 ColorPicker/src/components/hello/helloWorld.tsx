import * as React from 'react';

export const HelloWorldComponent = (props : {userName : string}) => {
  return (
    <h2>Hello Mr. {props.userName} !</h2>
  );
}