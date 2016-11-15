import * as React from 'react';
import {StudentEntity} from '../../../model/student';

interface Props {
  student : StudentEntity;
  editStudent : (id:number) => void;
}

export const StudentRowComponent = (props : Props) => {
  return (
    <tr>
      <td>
       {(props.student.gotActiveTraining)
        ?
        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
        :
        null}
      </td>
      <td>
        <span>{props.student.fullname}</span>
      </td>
      <td>
        <span>{props.student.email}</span>
      </td>
      <td>
        <div onClick={(e) => props.editStudent(props.student.id)}>
          <span className="glyphicon glyphicon-pencil"
                aria-hidden="true"
                ></span>
        </div>
        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </td>

    </tr>
  );
}
