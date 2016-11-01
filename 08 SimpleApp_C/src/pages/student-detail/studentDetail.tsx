import * as React from 'react';
import {StudentEntity} from '../../model/student';

interface Props  {
  params? : any;
  student : StudentEntity
}

export class StudentDetailComponent extends React.Component<Props, {}> {

  componentDidMount() {
    const studentId = this.props.params.id;
  }


  render() {
    return (
      <div>
        if(!this.props.student) {
          <span>Student Info loading...</span>
        } else {
          <div>
            <h2>I'm the Student Detail page</h2>
            <span>Test, student name {this.props.student.fullname}</span>
          </div>
        }
      </div>
    );
  }
}
