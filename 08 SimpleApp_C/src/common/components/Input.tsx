import * as React from 'react';

interface Props {
  name : string;
  label : string;
  onChange : any;
  placeholder? : string;
  value: string;
}

export class Input extends React.Component<Props, {}> {
  constructor(props : Props){
      super(props);
  }

  public render() {
     var wrapperClass : string = 'form-group';
     
     return (
       <div className={wrapperClass}>
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <div className="field">
            <input type="text"
              name={this.props.name}
              className="form-control"
              placeholder={this.props.placeholder}
              ref={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange} />
          </div>
        </div>
     );
  }
}
