import * as React from 'react';


interface Props  {
  params? : any;
}

export class StudentDetailComponent extends React.Component<Props, {}> {

  componentDidMount() {
    const studentId = this.props.params.id;
  }


  render() {
    return (
      <h2>I'm the Student Detail page</h2>
    );
  }
}
