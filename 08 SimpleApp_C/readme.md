# 07 Simple App C

This sample series takes as starting point _06 SimpleApp B_

In this sample we are going to implement the single student edition.

Summary steps:

- Let's add a param based navigation from student-list to student-detail.
- Let's load the requested student.
- Let's provide support for the changes to be saved.
- Let's incorporate validation.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _06 Simple App B_ and execute _npm install_.

- Let's add a new action that will fire navigation (we will trigger this
  when clicking on the pencil icon on one of the students row).


_./src/student-list/actions/navigateToEditStudent.ts_

```javascript
import {actionsEnums} from '../../../common/actionsEnums';
import { browserHistory } from 'react-router'

export const navigateToEditStudentAction = (studentId : number) => {
  return function(dispatcher) {
    browserHistory.push(`/student-detail/${studentId}`)
  }
}
```

- Let's update the routes, in order to support params on the edit-student url.

_./src/main.tsx_
```javascript
<Route path="student-detail/:id" component={StudentDetailContainer}/>
```

- To trigger this validation we need to request it from the container component,
and then pass it down til the studentRow component.

_./src/pages/student-list/studentListContainer.tsx_

```javascript
import { connect } from 'react-redux';
import { studentListRequestStartedAction } from './actions/studentListRequestStarted';
import { navigateToEditStudentAction } from './actions/navigateToEditStudent';
import { StudentListComponent } from './studentList';


const mapStateToProps = (state) => {
    return {
      studentList: state.studentReducer.studentsList
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentList: () => dispatch(studentListRequestStartedAction()),
    editStudent : (id:number) => dispatch(navigateToEditStudentAction(id))
  }
}

export const StudentListContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentListComponent);
```

_./src/pages/student-list/studentList.tsx_

```javascript
interface Props {
  studentList : StudentEntity[];
  getStudentList : () => void;
  editStudent : (id:number) => void;
}

// (...)
<StudentTableComponent studentList={this.props.studentList} editStudent={this.props.editStudent}/>
```

_./src/pages/student-list/components/studentTable.tsx_

```javascript
interface Props {
  studentList : StudentEntity[];
  editStudent : (id:number) => void;
}

// (...)

<StudentRowComponent
  key={student.id}
  student = {student}
  editStudent ={props.editStudent}/>

```

_./src/pages/student-list/components/studentRow.tsx_

```javascript
interface Props {
  student : StudentEntity;
  editStudent : (id:number) => void;
}

//(...)
<div onClick={(e) => props.editStudent(props.student.id)}>
  <span className="glyphicon glyphicon-pencil"
        aria-hidden="true"
        ></span>
</div>
```

- Let's give a try and check that we reach the page when clicking on the
student edit icon (we can place a breakpoint in studentDetail > componentDidMount
to ensure that the id param is being informed).


- Time to read the parameter value from the editStudent component:

_./src/pages/student-detail/studentDetail.tsx_

```
interface Props  {
  params? : any;
}

export class StudentDetailComponent extends React.Component<Props, {}> {

  componentDidMount() {
    const studentId = this.props.params.id;
  }
```

- Now that we have got the right Id, we need to load the student information, we
are going to add a new method to the _students-api_.

_./src/rest-api/student-api.ts_

```javascript
// (...)
getStudentById(id : number) : Promise<StudentEntity> {
  const student = this.studentsData.find(st => st.id === id);
  return Promise.resolve(student);
}
// (...)
```

- let's define an aysnc action for this and a complete one, and load the form
fields with this information.

_./src/common/actionsEnums.ts

```javascript
export const actionsEnums = {
  // (...)
  STUDENT_GET_STUDENT_REQUEST_COMPLETED: 'STUDENT_GET_STUDENT_REQUEST_COMPLETED'
}
```

_./src/pages/student-detail/actions/getStudentRequestCompleted.ts_

```javascript
import { actionsEnums } from '../../../common/actionsEnums';
import { StudentEntity } from '../../../model/student';

export const getStudentRequestCompletedAction = (student : StudentEntity) => {
  return {
    type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
    payload: student
  }
}
```

_./src/pages/student-detail/actions/getStudentRequestStart.ts_

```javascript
import {actionsEnums} from '../../../common/actionsEnums';
import {StudentEntity} from '../../../model/student';
import {studentApi} from '../../../rest-api/student-api';
import {getStudentRequestCompletedAction} from './getStudentRequestCompleted';

export const getStudentRequestStartAction = (studentId : number) => {
  return function(dispatcher) {
    const promise = studentApi.getStudentById(studentId);

    promise.then(
      data => {
        dispatcher(getStudentRequestCompletedAction(data));
      }
    );

    return promise;
  }
}
```

- Let's update the reducer

_./src/reducers/student.ts_

```javascript
import {actionsEnums} from '../common/actionsEnums';
import objectAssign = require('object-assign');
import {StudentEntity} from '../model/student';

class StudentState  {
  studentsList : StudentEntity[];
  editingStudent : StudentEntity;

  public constructor()
  {
    this.studentsList = [];
    this.editingStudent = new StudentEntity();
  }
}

export const studentReducer =  (state : StudentState = new StudentState(), action) => {
      switch (action.type) {
        case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
           return handleGetStudentList(state, action.payload);
       case actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED:
          return handleGetStudent(state, action.payload);

      }

      return state;
};

const handleGetStudentList = (state : StudentState, payload : StudentEntity[]) => {
  const newState = objectAssign({}, state, {studentsList: payload});
  return newState;
}


const handleGetStudent = (state : StudentState, payload : StudentEntity[]) => {
  const newState = objectAssign({}, state, {editingStudent: payload});
  return newState;
}
```

- Let's go back to the studentDetail component, we are going to expose a property
that will hold the student being edited:

_./src/pages/student-detail/studentDetail.tsx_

```javascript
import * as React from 'react';
import {StudentEntity} from '../../model/student';

interface Props  {
  params? : any;
  student : StudentEntity
}

export class StudentDetailComponent extends React.Component<Props, {}> {

  componentDidMount() {
    const studentId = Number(this.props.params.id);
  }


  render() {
    return (
      <div>
        if(!this.props.student) {
          <span>Student Info loading...</span>
        } else {
          <div>
            <h2>Im the Student Detail page</h2>
            <span>Test, student name {this.props.student.fullname}</span>
          </div>
        }
      </div>
    );
  }
}
```

- Then in the container we will request it.

_./src/pages/student-detail/studentDetailContainer.tsx_

```javascript
//(...)
const mapStateToProps = (state) => {
    return {
      student : state.studentReducer.editingStudent
    }
}
//(...)
```

- Let's check that the sample is working end to end:

```
npm start
```

- It's time to build a form that will contain the data to be edited, we will
define it using some special Id's to make it easier to get the properties updated.
Let's start by creating a common input component.

_./src/common/components/Input.sx_

```javascript
import * as React from 'react';

interface Props {
  name : string;
  label : string;
  onChange : any;
  placeholder? : string;
  value: string;
  error : string;
}

export class Input extends React.Component<Props, {}> {
  constructor(props : Props){
      super(props);
  }

  public render() {
     var wrapperClass : string = 'form-group';
     if (this.props.error && this.props.error.length > 0) {
       wrapperClass += " " + 'has-error';
     }
     return (
       <div className={wrapperClass}>
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <div className="field">
            <input type="text"
              name={this.props.name}
              className="form-control"
              placeholder={this.props.placeholder}
              ref={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange} />
            <div className="input">{this.props.error}</div>
          </div>
        </div>
     );
  }
}
```

- Let's build the form layout.

_./src/pages/student-detail/components/studentForm.tsx_

```javascript
import * as React from 'react';
import {Input} from '../../../common/components/Input';
import {StudentEntity} from '../../../model/student';

interface Props {
    student : StudentEntity;
    fireFieldValueChanged  : (viewModel : any, fieldName : string, value : any) => void;
    saveStudent : (student : StudentEntity) => void;
}

export const StudentForm = (props : Props) => {

  const updateStudentFromUI = (event) => {
    var field = event.target.name;
    var value = event.target.value;

    props.fireFieldValueChanged(props.student, field, value);
  }

  const onSave = (event) => {
    event.preventDefault();
    this.props.saveStudent(this.props.student);
  }


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

            <input type="submit" value="Save" className="btn btn-default"
                onClick={onSave.bind(this)} />
   </form>
  )
}
```

- Now we need to propagate most of the props to the _studentDetail_ page:

```javascript
interface Props  {
  params? : any;
  student : StudentEntity;
  getstudent : (id : number) => void;
  fireFieldValueChanged  : (viewModel : any, fieldName : string, value : any) => void;
  saveStudent : (student : StudentEntity) => void;  
}
```

- Before defining this bindings in the _studentDetailContainer_ we need to
define the needed actions. Let's start by defining the enums:

```javascript
STUDENT_FIELD_VALUE_CHANGED: 'STUDENT_FIELD_VALUE_CHANGED',
STUDENT_SAVE_COMPLETED: 'STUDENT_SAVE_COMPLETED',
```

- Now let's the define an async action (we will see later on why this)
for the _studentFieldValueChanged_ action.

_./src/pages/student-detail/actions/studentFieldValueChangedStart_

```javascript
import {studentFieldValueChangedCompleted} from './studentFieldValueChangedCompleted';

export function studentFieldValueChangedStart(viewModel : any, fieldName : string, value: any) {

    return (dispatcher) => {
      // This will change when we add validations to this action
      dispatcher(studentFieldValueChangedCompleted(fieldName, value ));
    }
}
```

_./src/pages/student-detail/actions/studentFieldValueChangedCompleted_

```javascript
import { actionsEnums } from '../../../common/actionsEnums';

export const studentFieldValueChangedCompleted = (fieldName : string, value : string) => {
  return {
    type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
    payload: {
      fieldName : fieldName,
      value : value
    }
  }
}
```


- Let's define as well an async action for the _saveStudent_ action.
