import * as React from "react";
import { Input } from "../../../common/components/Input";
import { StudentEntity } from "../../../model/student";

interface Props {
  student: StudentEntity;
  fireFieldValueChanged: (viewModel: any, fieldName: string, value: any) => void;
  saveStudent: (student: StudentEntity) => void;
}

export const StudentForm = (props: Props) => {

  const updateStudentFromUI = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    props.fireFieldValueChanged(props.student, field, value);
  };

  const onSave = (event) => {
    event.preventDefault();
    props.saveStudent(props.student);
  };


  return (
    <form>
      <h1>Customer Form</h1>

      <Input
        name="fullname"
        label="full name"
        value={props.student.fullname}
        onChange={updateStudentFromUI.bind(this)}
      />

      <Input
        name="email"
        label="email"
        value={props.student.email}
        onChange={updateStudentFromUI.bind(this)}
      />

      <button type="submit" className="btn btn-default" onClick={onSave.bind(this)}>
        Save
      </button>
    </form>
  );
};
