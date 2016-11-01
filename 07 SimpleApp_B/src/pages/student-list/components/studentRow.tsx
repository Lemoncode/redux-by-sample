import * as React from 'react';
import {StudentEntity} from '../../../model/student';

interface Props {
  student : StudentEntity;
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
        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </td>

    </tr>
  );
}
