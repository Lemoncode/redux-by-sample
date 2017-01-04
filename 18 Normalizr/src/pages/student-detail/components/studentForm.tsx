import * as React from "react";
import { Input } from "../../../common/components/Input";
import { StudentView } from "../../../model/view/studentView";
import { StudentErrors } from "../../../model/view/studentErrors";
import { CountryView } from '../../../model/view/countryView';

interface Props {
  student: StudentView;
  errors: StudentErrors;
  fireFieldValueChanged: (viewModel: any, fieldName: string, value: any, filter?: any) => void;
  saveStudent: (student: StudentView) => void;
  countries: CountryView[];
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

  const onSelectCountry = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    //TODO: Create fireSubpropertyFieldValueChanged
    props.fireFieldValueChanged(props.student, field, value, "id");
  }


  return (
    <form>
      <h1>Customer Form</h1>

      <Input
        name="fullname"
        label="full name"
        value={props.student.fullname}
        onChange={updateStudentFromUI.bind(this)}
        error={(props.errors.fullname) ? props.errors.fullname.errorMessage : ""}
      />

      <Input
        name="email"
        label="email"
        value={props.student.email}
        onChange={updateStudentFromUI.bind(this)}
        error={(props.errors.email) ? props.errors.email.errorMessage : ""}
      />

      <select
        name="country"
        value={props.student.country.id}
        onChange={(e) => updateStudentFromUI(e)}>
        {
          props.countries.map((country) =>
            <option key={country.id} value={country.id}>{country.name}</option>
          )
      }
      </select>

      <button type="submit" className="btn btn-default" onClick={onSave.bind(this)}>
        Save
      </button>
   </form>
  );
};
