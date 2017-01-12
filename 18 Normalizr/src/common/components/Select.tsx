import * as React from "react";
import {ValidationFieldComponent} from './validationFieldComponent';

interface Props {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  value: any;
  error?: string;
  options: any;
}

export const Select = (props: Props) => {

  return (
    <ValidationFieldComponent error={props.error}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <select
        name={props.name}
        className="form-control"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur} >
      {props.options}
      </select>
    </ValidationFieldComponent>

  );
}
