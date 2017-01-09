import * as React from "react";

interface Props {
  error?: string;
}

export class ValidationFieldComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    let wrapperClass: string = "form-group";
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " has-error";
    }
    return (
      <div className={wrapperClass}>
        {this.props.children}
        <div className="help-block">
          {this.props.error}
        </div>
      </div>
    );
  }
}
