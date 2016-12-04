import * as React from "react";
import { StudentEntity } from "../../../model/student";
import { StudentHeaderComponent } from "./studentHeader";
import { StudentRowComponent } from "./studentRow";

interface Props {
  studentList: StudentEntity[];
  editStudent: (id: number) => void;
}

export const StudentTableComponent = (props: Props) => {
  return (
    <table className="table">
      <StudentHeaderComponent/>
      <tbody>
        {
          props.studentList.map((student: StudentEntity) =>
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
