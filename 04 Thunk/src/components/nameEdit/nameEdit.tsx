import * as React from 'react';

export const NameEditComponent = (props: {userName : string, onChange : (name : string) => any}) => {
  return (
    <div>
      <label>Update Name:</label>
      <input
        value={props.userName}
        onChange={(e : any) => props.onChange(e.target.value)}
        />
    </div>
  );
}
