# 07 SimpleApp_List

This sample series takes as its starting point "_06 SimpleApp_Navigation_".

In this sample we will continue implementing our simple application, in this
case we are going to implement a page where a list of students is displayed.

Summary steps:

- Let's create a _StudentEntity_.
- Let's create a method in the fake api to retrieve the list of students.
- Let's create an action that will be triggered by a component (load students).
- Let's create a simple component, plus a container component.
- Let's start building the rendering of this components (including breakdown in subcomponents)

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (>=v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _06 SimpleApp_Navigation_ and execute:

  ```
  npm install
  ```

- Let's create an entity under _./src/model/student.ts_

```javascript
export class StudentEntity {
  id: number;
  gotActiveTraining: boolean;
  fullname: string;
  email: string;

  public constructor() {
    this.id = -1;
    this.gotActiveTraining = false;
    this.fullname = "";
    this.email = "";
  }
}
```

- We need to create some mockdata, let's create a _./src/rest-api/mock-data.ts_:

  ```
  import { StudentEntity } from "../model/student";

  export const studentsMockData: StudentEntity[] = [
    {id: 1, gotActiveTraining: true, fullname: "John Doe", email: "john@fakeemail.com"},
    {id: 2, gotActiveTraining: false, fullname: "Mike Huff", email: "mike@fakeemail.com"},
    {id: 3, gotActiveTraining: true, fullname: "Harry Poe", email: "harry@fakeemail.com"},
    {id: 4, gotActiveTraining: true, fullname: "Mary Joe", email: "mary@fakeemail.com"}
  ];

  ```

- It's time to add our _student-api_: _./src/rest-api/student-api.ts_

  ```javascript
  import { StudentEntity } from "../model/student";
  import { studentsMockData } from "./mock-data";

  class StudentApi {
    studentsData: StudentEntity[];

    constructor() {
      // Let's load the mock data whenever the singleton is instantiated
      // and then play with the in-memory array
      this.studentsData = studentsMockData;

    }

    loadStudentList(): Promise<StudentEntity[]> {
      return Promise.resolve(this.studentsData);
    }
  }

  export const studentApi = new StudentApi();
  ```

- Let's define a new action in the enum to load the students (in a real app
  we should start thinking about categorizing this actions in the const list,
  e.g. create a subcategory only to manage students and another subcategory
  to manage session or userprofile)

  _./src/common/actionsEnums.ts_

```diff
export const actionsEnums = {
  USERPROFILE_UPDATE_EDITING_LOGIN:  'USERPROFILE_UPDATE_EDITING_LOGIN',
  USERPROFILE_PERFORM_LOGIN : 'USERPROFILE_PERFORM_LOGIN',
+ STUDENTS_GET_LIST_REQUEST_COMPLETED: "STUDENTS_GET_LIST_REQUEST_COMPLETED"
}
```

- Let's create an async action that will make the request to the _student-api_
(in a real app we should balance whether this action can be something that
could be reused in more than once place and wether is worth to promote to
a common action).

_./src/pages/student-list/actions/studentListRequestCompleted.ts_

```javascript
import { actionsEnums } from "../../../common/actionsEnums";
import { StudentEntity } from "../../../model/student";

export const studentListRequestCompletedAction = (studentList: StudentEntity[]) => {
  return {
    type: actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED,
    payload: studentList
  };
};

```

_./src/pages/student-list/actions/studentListRequestStarted.ts_

```javascript
import { studentApi } from "../../../rest-api/student-api";
import { studentListRequestCompletedAction } from "./studentListRequestCompleted";

export const studentListRequestStartedAction = () => {
  return function(dispatcher) {
    const promise = studentApi.loadStudentList();

    promise.then(
      data => {
        dispatcher(studentListRequestCompletedAction(data));
      }
    );

    return promise;
  };
};
```
- Now that we have defined the completed action, let's create a new reducer
_studentReducer_ and register it.

_./src/reducers/student.ts_:

```javascript
import { actionsEnums } from "../common/actionsEnums";
import { StudentEntity } from "../model/student";

class StudentState  {
  studentsList: StudentEntity[];

  public constructor() {
    this.studentsList = [];
  }
}

export const studentReducer =  (state: StudentState = new StudentState(), action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return handleGetStudentList(state, action.payload);
  }

  return state;
};

const handleGetStudentList = (state: StudentState, payload: StudentEntity[]) => {
  return {
    ...state,
    studentsList: payload
  }
};
```

_./src/reducers/index.ts_:

```diff
  import { combineReducers } from "redux";
  import { sessionReducer } from "./session";
+ import { studentReducer} from "./student";
  import { routerReducer } from "react-router-redux";

  export const reducers =  combineReducers({
    sessionReducer,
+   studentReducer,
    routing: routerReducer
  });
```
- Let's define the props and a very simple render for the _studentList_ component. And
let's load the students list data whenever the component gets mounted (to do this
we need to move the component to state one).

_./src/pages/student-list/studentList.tsx_:

```jsx
import * as React from "react";
import { StudentEntity } from "../../model/student";

interface Props {
  studentList: StudentEntity[];
  getStudentList: () => void;
}

export class StudentListComponent extends React.Component<Props, {}> {
  // Just some quick render to test that student list is fullfilled
  private tempRenderRow = (student: StudentEntity) => {
    return (
      <div key={student.id}>
        <span>{student.fullname}</span>
        <br/>
      </div>
    );
  }

  componentDidMount() {
    this.props.getStudentList();
  }

  render() {
    return (
      <div>
        <h2>I'm the Student page</h2>
        <br/>
        {this.props.studentList.map(this.tempRenderRow, this)}
      </div>
    );
  }
}
```

- Now it's time to wire up stored + actions with the components, let's fulfill
  the students container component. _./src/pages/student-list/studentListContainer.tsx_:

```diff
import { connect } from "react-redux";
+ import { studentListRequestStartedAction } from "./actions/studentListRequestStarted";
import { StudentListComponent } from "./studentList";

const mapStateToProps = (state) => {
  return {
+      studentList: state.studentReducer.studentsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
+      getStudentList: () => dispatch(studentListRequestStartedAction()),
  };
};

export const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentListComponent);

```

- Let's give a try to what we have implemented so far:

  ```
  npm start
  ```

- Now that we have all the data and actions properly wired up let's focus on
the ui side, we are going to have the following structure (only presentational components):

  - studentList: The studentList Page.
  - components/studentTable: This one could be promoted to a common component in the future.
  - components/studentRow: a single row.

  _./src/pages/student-list/components/studentRow.tsx_:

```jsx
import * as React from "react";
import { StudentEntity } from "../../../model/student";

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
          <span className="glyphicon glyphicon-ok" aria-hidden="true" />
          :
          null
        }
      </td>
      <td>
        <span>{props.student.fullname}</span>
      </td>
      <td>
        <span>{props.student.email}</span>
      </td>
      <td>
        <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
        <span className="glyphicon glyphicon-trash" aria-hidden="true" />
      </td>
    </tr>
  );
};

```

_./src/pages/student-list/components/studentHeader.tsx_:

```jsx
import * as React from "react";

export const StudentHeaderComponent = () => {
  return (
    <thead>
      <tr>
        <th>Active Training</th>
        <th>Name</th>
        <th>Email</th>
        <th>Commands</th>
      </tr>
    </thead>
  );
};
```

_./src/pages/student-list/components/studentTable.tsx_:

```jsx
import * as React from "react";
import { StudentEntity } from "../../../model/student";
import { StudentHeaderComponent } from "./studentHeader";
import { StudentRowComponent } from "./studentRow";

interface Props {
  studentList: StudentEntity[];
}

export const StudentTableComponent = (props: Props) => {
  return (
    <table className="table">
      <StudentHeaderComponent/>
      <tbody>
        {
          props.studentList.map((student: StudentEntity) =>
            <StudentRowComponent key={student.id} student = {student}/>
          )
        }
      </tbody>
    </table>
  );
};

```

_./src/stundent-list/studentList.tsx_

```diff
import * as React from "react";
import { StudentEntity } from "../../model/student";
+ import { StudentTableComponent } from "./components/studentTable";

interface Props {
  studentList: StudentEntity[];
  getStudentList: () => void;
}

export class StudentListComponent extends React.Component<Props, {}> {
-  // Just some quick render to test that student list is fullfilled
-  private tempRenderRow = (student: StudentEntity) => {
-    return (
-      <div key={student.id}>
-        <span>{student.fullname}</span>
-        <br/>
-      </div>
-    );
-  }

  componentDidMount() {
    this.props.getStudentList();
  }

  render() {
    return (
      <div>
        <h2>I"m the Student page</h2>
        <br/>
-       {this.props.studentList.map(this.tempRenderRow, this)}
+       <StudentTableComponent studentList={this.props.studentList}/>
      </div>
    );
  }
}
```

- Let's give a try

```
npm start
```



