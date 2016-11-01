import * as React from 'react';
import {StudentEntity} from '../../model/student';

interface Props  {
  params? : any;
  student : StudentEntity;
  getstudent : (id : number) => void;
}

export class StudentDetailComponent extends React.Component<Props, {}> {

  componentDidMount() {
    const studentId = this.props.params.id;
    this.props.getstudent(studentId);
  }


  render() {
    if(!this.props.student)
      return <span>Student Info loading...</span>

    return (
      <div>
          {
            <div>
              <h2>I'm the Student Detail page</h2>
              <span>Test, student name {this.props.student.fullname}</span>
            </div>
          }
      </div>
    );
  }
}
