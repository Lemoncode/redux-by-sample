import * as React from "react";
import { StudentView } from "../../model/view/studentView";
import { StudentForm } from "./components/studentForm";
import { StudentErrors } from "../../model/view/studentErrors";
import { CountryView } from '../../model/view/countryView';

interface Props  {
  params?: any;
  student: StudentView;
  getstudent: (id: number) => void;
  errors: StudentErrors;
  fireFieldValueChanged: (viewModel: any, fieldName: string, value: any, filter?: any) => void;
  saveStudent: (student: StudentView) => void;
  resetStudent: () => void;
  countries: CountryView[];
  addInvalidCountryEntry: (country: CountryView) => void;
}

export class StudentDetailComponent extends React.Component<Props, {}> {
  componentDidMount() {
    const studentId: number = Number(this.props.params.id);
    if (studentId > 0) {
      this.props.getstudent(studentId);
    } else {
      this.props.resetStudent();
    }

    this.props.addInvalidCountryEntry({ id: 0, name: "Select country..." });
  }

  render() {
    if (!this.props.student)
      return <span>Student Info loading...</span>;

    return (
      <StudentForm
        student={this.props.student}
        fireFieldValueChanged={this.props.fireFieldValueChanged}
        saveStudent={this.props.saveStudent}
        errors={this.props.errors}
        countries={this.props.countries}
      />
    );
  }
}
