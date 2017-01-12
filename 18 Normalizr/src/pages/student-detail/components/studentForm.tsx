import * as React from 'react';
import { Input, Select } from '../../../common/components/';
import { StudentView } from '../../../model/view/studentView';
import { StudentErrors } from '../../../model/view/studentErrors';
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

  const onSelectCountry = (event, value) => {
    let field = event.target.name;

    props.fireFieldValueChanged(props.student.country, field, value);
  };

  return (
    <form>
      <h1>Customer Form</h1>

      <Input
        name="fullname"
        label="Full name"
        value={props.student.fullname}
        onChange={updateStudentFromUI}
        error={(props.errors.fullname) ? props.errors.fullname.errorMessage : ""}
      />

      <Input
        name="email"
        label="Email"
        value={props.student.email}
        onChange={updateStudentFromUI}
        error={(props.errors.email) ? props.errors.email.errorMessage : ""}
      />

      <Select
        name="country"
        label="Country"
        value={props.student.country.id}
        onChange={(e: any) => onSelectCountry(e, {id: e.target.value})}
        error={(props.errors.country) ? props.errors.country.errorMessage : ""}
        options={
          props.countries.map((country) =>
            <option key={country.id} value={country.id}>{country.name}</option>
          )
        } />

      <button type="submit" className="btn btn-default" onClick={onSave.bind(this)}>
        Save
      </button>
   </form>
  );
};
