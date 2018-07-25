import * as React from "react";
import { StudentEntity } from "../../../model/student";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  student: StudentEntity;
}

export const StudentRowComponent = (props: Props) => {
  return (
    <tr>
      <td>
        {
          (props.student.gotActiveTraining)
          ?
            <FontAwesomeIcon icon={faCheck} />
            :
            <FontAwesomeIcon icon={faTimes} />
        }
      </td>
      <td>
        <span>{props.student.fullname}</span>
      </td>
      <td>
        <span>{props.student.email}</span>
      </td>
      <td>
        <FontAwesomeIcon icon={faPencilAlt} />
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};
