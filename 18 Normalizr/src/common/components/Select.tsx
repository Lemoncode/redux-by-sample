import * as React from "react";
import {ValidationFieldComponent} from './validationFieldComponent';

interface Props {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  value: any;
  error?: string;
  option: any;
}

export const Select = (props: Props) => {

  return (
    <ValidationFieldComponent
     name={props.name} label={props.label} error={props.error}>
       <select
         name={props.name}
         className="form-control"
         value={props.value}
         onChange={props.onChange}
         onBlur={props.onBlur} >
        {props.option}
       </select>
    </ValidationFieldComponent>

  );
}
