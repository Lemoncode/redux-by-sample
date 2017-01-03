import * as React from "react";
import { StudentView } from "../../../model/view/studentView";
import { StudentHeaderComponent } from "./studentHeader";
import { StudentRowComponent } from "./studentRow";

interface Props {
  studentList: StudentView[];
  editStudent: (id: number) => void;
}

export const StudentTableComponent = (props: Props) => {
  return (
    <table className="table">
      <StudentHeaderComponent/>
      <tbody>
        {
          props.studentList.map((student: StudentView) =>
            <StudentRowComponent
              key={student.id}
              student={student}
              editStudent={props.editStudent}
            />
          )
        }
      </tbody>
    </table>
  );
};
