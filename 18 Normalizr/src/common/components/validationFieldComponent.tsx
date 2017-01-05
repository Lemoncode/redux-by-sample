import * as React from "react";

interface Props {
  name: string;
  label: string;
  error?: string;
}

export class ValidationFieldComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    let wrapperClass: string = "form-group";
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + "has-error";
    }
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <div className="field">
          {this.props.children}

          <div className="help-block">
            {this.props.error}
          </div>
        </div>
      </div>
    );
  }
}
