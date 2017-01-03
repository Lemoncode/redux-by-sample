import * as React from "react";
import { StudentView } from "../../model/view/studentView";
import { StudentTableComponent } from "./components/studentTable";
import {AddStudentComponent} from './components/addStudent';

interface Props {
  studentList: StudentView[];
  getStudentList: () => void;
  editStudent: (id: number) => void;
  navigateToAddNewStudent: () => void;
}


export class StudentListComponent extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.getStudentList();
  }

  render() {
    return (
      <div>
        <AddStudentComponent navigateToAddNewStudent={this.props.navigateToAddNewStudent} />
        <StudentTableComponent
          studentList={this.props.studentList}
          editStudent={this.props.editStudent}
        />
      </div>
    );
  }
}
