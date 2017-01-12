import * as React from "react";
import { StudentView } from "../../../model/view/studentView";

interface Props {
  student: StudentView;
  editStudent: (id: number) => void;
}

export const StudentRowComponent = (props: Props) => {

  const getCountryName = () => {
    return props.student.country.id ?
      props.student.country.name:
      "";
  };

  return (
    <tr>
      <td>
        {
          (props.student.gotActiveTraining)
          ?
          <span className="glyphicon glyphicon-ok" aria-hidden="true" />
          :
          null
        }
      </td>
      <td>
        <span>{props.student.fullname}</span>
      </td>
      <td>
        <span>{props.student.email}</span>
      </td>
      <td>
        <span>{getCountryName()}</span>
      </td>
      <td>
        <span className="btn btn-link btn-xs" onClick={(e) => props.editStudent(props.student.id)}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
        </span>
        <span className="glyphicon glyphicon-trash" aria-hidden="true" />
      </td>
    </tr>
  );
};
