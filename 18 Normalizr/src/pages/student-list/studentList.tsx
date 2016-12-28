import * as React from "react";
import { StudentEntity } from "../../model/student";
import { StudentTableComponent } from "./components/studentTable";

interface Props {
  studentList: StudentEntity[];
  getStudentList: () => void;
  editStudent: (id: number) => void;
}


export class StudentListComponent extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.getStudentList();
  }

  render() {
    return (
      <div>
        <StudentTableComponent
          studentList={this.props.studentList}
          editStudent={this.props.editStudent}
        />
      </div>
    );
  }
}
