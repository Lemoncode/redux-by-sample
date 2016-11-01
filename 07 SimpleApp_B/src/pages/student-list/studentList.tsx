import * as React from 'react';
import {StudentEntity} from '../../model/student';

interface Props {
  studentList : StudentEntity[];
  getStudentList : () => void;
}

export class StudentListComponent extends React.Component<Props, {}> {

  // Just some quick render to test that student list is fullfilled
  private tempRenderRow = (student : StudentEntity) => {
    return (
        <div>
          <span>{student.fullname}</span>
          <br/>
        </div>
    )
  }

  componentDidMount() {
    this.props.getStudentList();
  }

  render() {
    return (
      <div>
        <h2>I'm the Student page</h2>
        <br/>
        {this.props.studentList.map(this.tempRenderRow, this)}
      </div>
    )
  }
}
