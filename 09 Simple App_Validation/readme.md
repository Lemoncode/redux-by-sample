# 09 SimpleApp_Validation

This sample series takes as starting point _08 SimpleApp_Form_.

In this sample we are going to add form field validation field support to the
student form.

Summary steps:

- Install lc-form-validation.
- Create the needed validators.
- Configure the student form validations.
- Extend the updatefield action to support validation.
- Extend the reducer to support validation
- Add support in the component ui to display validations.
- Wire up the container.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (>=v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _08 SimpleApp_Form_ and execute:

  ```
  npm install
  ```
- Let's install the lc-form-validation package

  ```
  npm install lc-form-validation --save
  ```

> We don't need to install additional typescript definition because the project already brings it

- Let's create an entity that will hold the form errors as _./src/model/studentErrors.ts_:


```javascript
import { FieldValidationResult } from "lc-form-validation";

export class StudentErrors {
  fullname: FieldValidationResult;
  email: FieldValidationResult;
}
```

- Let's define the student form validation in our project (let's make user and email mandatory fields).

_./src/pages/student-detail/student.validation.ts_

```javascript
import { Validators, createFormValidation } from 'lc-form-validation'

// validation constraints definition
const validationConstraints = {
  fields: {
    fullname: [
      { validator: Validators.required },
    ],
    email: [
      { validator: Validators.required },
      { validator: Validators.email }
    ]
  }
};

export const studentFormValidation = createFormValidation(validationConstraints);
```

- Let's update the generic input control that will take care of handling user input plus displaying
inline errors.

_./src/common/components/Input.tsx_

```diff
  import * as React from "react";

  interface Props {
    name: string;
    label: string;
    onChange: any;
+   onBlur?: any;
    placeholder?: string;
    value: string;
    error?: string;
  }

  export class Input extends React.Component<Props, {}> {
    constructor(props: Props) {
      super(props);
    }

    public render() {
      let wrapperClass: string = "form-group";
      if (this.props.error && this.props.error.length > 0) {
        wrapperClass += " " + "has-error";
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
              onChange={this.props.onChange}
+             onBlur={this.props.onBlur}
            />
            <div className="input">{this.props.error}</div>
          </div>
        </div>
      );
    }
  }
```

- Now it's time to update the action UI input update actions, start:

_./src/pages/student-detail/actions/studentFieldValueChangedStart.ts_

```diff
  import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";
+ import { studentFormValidation } from '../student.validation'

  export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any) {
    return (dispatcher) => {
-     // This will change when we add validations to this action
-     dispatcher(studentFieldValueChangedCompleted(fieldName, value));
+     studentFormValidation.validateField(viewModel, fieldName, value).then(
+       (fieldValidationResult) => dispatcher(studentFieldValueChangedCompleted(fieldName, value, fieldValidationResult))
+     );
    };
  }
```

- Completed

_./src/pages/student-detail/actions/studentFieldValueChangedCompleted.ts_

```diff
  import { actionsEnums } from "../../../common/actionsEnums";
+ import { FieldValidationResult } from "lc-form-validation";
+
+  interface IStudentFieldValueChangedCompletedPayload {
+    fieldName: string;
+    value: any;
+    fieldValidationResult: FieldValidationResult;
+  }

-  export const studentFieldValueChangedCompleted = (fieldName: string, value: string) => {
-    return {
-      type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
-      payload: {
-        fieldName: fieldName,
-        value: value
-      }
-    };
-  };
+ const studentFieldValueChangedCompleted = (fieldName: string, value: string, fieldValidationResult: FieldValidationResult) => {
+   return {
+     type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
+     payload: {
+       fieldName,
+       value,
+       fieldValidationResult
+     } as IStudentFieldValueChangedCompletedPayload
+   };
+ };
+
+ export {
+   IStudentFieldValueChangedCompletedPayload,
+   studentFieldValueChangedCompleted
+ }
```

- Let's jump into the reducer

```diff
  import { actionsEnums } from "../common/actionsEnums";
  import { StudentEntity } from "../model/student";
+ import { StudentErrors } from "../model/studentErrors";
+ import { IStudentFieldValueChangedCompletedPayload } from "../pages/student-detail/actions/studentFieldValueChangedCompleted";


  class StudentState  {
    studentsList: StudentEntity[];
    editingStudent: StudentEntity;
+   editingStudentErrors: StudentErrors;

    public constructor() {
      this.studentsList = [];
      this.editingStudent = new StudentEntity();
+     this.editingStudentErrors = new StudentErrors();
    }
  }

  export const studentReducer =  (state: StudentState = new StudentState(), action) => {
    switch (action.type) {
      case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
        return handleGetStudentList(state, action.payload);
     case actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED:
       return handleGetStudent(state, action.payload);
     case actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED:
       return handleFieldValueChanged(state, action.payload);

    }

    return state;
  };

  const handleFieldValueChanged = (state: StudentState, payload) => {
    const newStudent = {
        ...state.editingStudent,
        [payload.fieldName]: payload.value
    };

    return {
        ...state,
        editingStudent: newStudent
    }
  };


  const handleFieldValueChanged = (state: StudentState, payload) => {
    const newStudent = {
        ...state.editingStudent,
        [payload.fieldName]: payload.value
    };

+   const newStudentErrors = {
+     ...state.editingStudentErrors,
+     [payload.fieldName]: payload.fieldValidationResult
+   };
+
    return {
      ...state,
      editingStudent: newStudent,
+     editingStudentErrors: newStudentErrors
    }
  };

  //(...)
```

Let's jump now on the component side

_./src/pages/student-detail/components/studentForm.tsx_

```diff
  import * as React from "react";
  import { Input } from "../../../common/components/Input";
  import { StudentEntity } from "../../../model/student";
+ import { StudentErrors } from "../../../model/studentErrors";

  interface Props {
    student: StudentEntity;
+   errors: StudentErrors;
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
+        error={(props.errors.fullname) ? props.errors.fullname.errorMessage : ""}
        />

        <Input
          name="email"
          label="email"
          value={props.student.email}
          onChange={updateStudentFromUI.bind(this)}
+         error={(props.errors.email) ? props.errors.email.errorMessage : ""}
        />

        <button type="submit" className="btn btn-default" onClick={onSave.bind(this)}>
          Save
        </button>
      </form>
    );
  };
```

_./src/pages/student-detail/studentDetail.tsx_

```diff
  import * as React from "react";
  import { StudentEntity } from "../../model/student";
  import { StudentForm } from "./components/studentForm";
+ import { StudentErrors } from "../../model/studentErrors";

  interface Props  {
    params?: any;
    student: StudentEntity;
    getstudent: (id: number) => void;
+   errors: StudentErrors;
    fireFieldValueChanged: (viewModel: any, fieldName: string, value: any) => void;
    saveStudent: (student: StudentEntity) => void;
  }

  export class StudentDetailComponent extends React.Component<Props, {}> {
    componentDidMount() {
      const studentId: number = Number(this.props.params.id);
      this.props.getstudent(studentId);
    }

    render() {
        if (!this.props.student)
          return <span>Student Info loading...</span>;

        return (
          <StudentForm
            student={this.props.student}
            fireFieldValueChanged={this.props.fireFieldValueChanged}
            saveStudent={this.props.saveStudent}
+           errors={this.props.errors}
          />
        );
    };
  };
```

_./src/pages/student-detail/studentDetailContainer.tsx_

```diff
  import { connect } from 'react-redux';
  import { StudentDetailComponent } from './studentDetail';
  import { getStudentRequestStartAction } from "./actions/getStudentRequestStart";
  import { studentFieldValueChangedStart } from "./actions/studentFieldValueChangedStart";
  import { StudentEntity } from "../../model/student";
  import { studentSaveRequestStart } from "./actions/studentSaveRequestStart";

  const mapStateToProps = (state) => {
      return {
        student: state.studentReducer.editingStudent,
+       errors: state.studentReducer.editingStudentErrors,
      }
  }

  // (...)
```

- Let's make a quick test before we keep on progressing:

  ```
  npm start
  ```

- Now, let's avoid saving the data whenever the form contains errors and display a
notification to the user asking to review the form errors.

- First of all we are going to install a library to display toast notifications like,
we will install the popular _toastr_, it needs _jquery_ as a dependency (there are
other toastr libraries that doesn't need jquery as dependency) .

```cmd
npm install jquery --save
npm install toastr --save
```

```
npm install @types/toastr --save-dev
```

- Let's update webpack config in order to include the toastr styles.

```diff
  entry: [
    'babel-polyfill',
    './main.tsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
+    '../node_modules/toastr/build/toastr.css',
  ],
```

- Let's check the status of the form before saving, in case there is an errors
let's display a toast indicating that the form contains errors.

_./src/pages/student-detail/actions/studentSaveRequestStart.ts_:

```diff
  import { actionsEnums } from "../../../common/actionsEnums";
  import { StudentEntity } from "../../../model/student";
  import { studentApi } from "../../../rest-api/student-api";
  import { studentSaveRequestCompletedAction } from "./studentSaveRequestCompleted";
+ import * as toastr from "toastr";
+ import { FormValidationResult } from 'lc-form-validation';
+ import { studentFormValidation } from '../student.validation';


  export const studentSaveRequestStart = (student: StudentEntity) => {

+   const saveStudent = (dispatcher, student: StudentEntity): Promise<boolean> => {
+     const promise = studentApi.saveStudent(student);
+
+     promise.then(
+       succeeded => {
+         dispatcher(studentSaveRequestCompletedAction(succeeded));
+         if (succeeded) {
+           toastr.success("Student saved succesfully.");
+         }
+       }
+     );
+     return promise;
+   }


    return function(dispatcher) {
-     const promise = studentApi.saveStudent(student);
-
-     promise.then(
-       data => {
-         dispatcher(studentSaveRequestCompletedAction(data));
-       }
-     );

+     let promise = null;

+     studentFormValidation.validateForm(student).then(
+       (formValidationResult: FormValidationResult) => {
+         if (formValidationResult.succeeded === true) {
+           saveStudent(dispatcher, student);
+         } else {
+           toastr.error("Form failed to save, please review the fields content.");
+         }
+       }
+     );

      return promise;
    };
  };
```
