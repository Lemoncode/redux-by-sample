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
