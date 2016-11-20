import * as React from 'react';
import {StudentEntity} from '../../model/student';
import {StudentForm} from './components/studentForm';
import {StudentErrors} from '../../model/studentErrors';

interface Props  {
  params? : any;
  student : StudentEntity;
  errors: StudentErrors;
  getstudent : (id : number) => void;
  fireFieldValueChanged  : (viewModel : any, fieldName : string, value : any, filter? : any) => void;
  saveStudent : (student : StudentEntity) => void;
}

export class StudentDetailComponent extends React.Component<Props, {}> {

  componentDidMount() {
    const studentId : number = Number(this.props.params.id);
    this.props.getstudent(studentId);
  }


  render() {
    if(!this.props.student)
      return <span>Student Info loading...</span>

    return (
      <StudentForm
        student={this.props.student}
        errors={this.props.errors}
        fireFieldValueChanged={this.props.fireFieldValueChanged}
        saveStudent={this.props.saveStudent}/>
    );
  }
}
