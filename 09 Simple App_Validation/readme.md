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

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

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

- We will define reusable field validations under common folder (we will start by adding a
  required validation).

_./src/common/validations/validators.ts_

  ```javascript
  import { FieldValidationResult } from "lc-form-validation";

  // TODO: Harcoded strings and Id's isolate them in a config class
  export const requiredValidationHandler = (vm: any, value: any): FieldValidationResult => {
    const isFieldInformed: boolean = (value != null && value.length > 0);
    const errorInfo: string = (isFieldInformed) ? "" : "Mandatory field";

    const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = "REQUIRED";
    fieldValidationResult.succeeded = isFieldInformed;
    fieldValidationResult.errorMessage = errorInfo;

    return fieldValidationResult;
  };

  ```

> By using this isolated functions, is quite easy to add unit test support to them without
getting involved the UI.

- Let's define the login form validation in our project (let's make user and email mandatory fields)
we will create a validations file. And install `es6-promise` package module:

  ```
  npm i --save es6-promise
  ```

  _./src/pages/login/login.validation.ts_

  ```javascript
  import { Promise } from "es6-promise";
  import { FieldValidationResult, BaseFormValidation } from "lc-form-validation";
  import { requiredValidationHandler } from "../../common/validations/validators";

  class LoginFormValidation extends BaseFormValidation {

    public constructor() {
      super();

      this._validationEngine.initialize([
        { formFieldName: "fullname", vmFieldName: "fullname" },
        { formFieldName: "email", vmFieldName: "email" }
      ]);

      this._validationEngine.addFieldValidation(
        "fullname",
        requiredValidationHandler,
      );

      this._validationEngine.addFieldValidation(
        "email",
        requiredValidationHandler,
      );
    }
  }

  export const loginFormValidation = new LoginFormValidation();

  ```

- Let's update the generic input control that will take care of handling user input plus displaying
inline errors.

  _./src/common/input.tsx_

  ```jsx
  import * as React from "react";

  interface Props {
    name: string;
    label: string;
    onChange: any;
    onBlur?: any;
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
          <label htmlFor={this.props.name}>
            {this.props.label}
          </label>
          <div className="field">
            <input type="text"
              name={this.props.name}
              className="form-control"
              placeholder={this.props.placeholder}
              ref={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              onBlur={this.props.onBlur}
            />
            <div className="input">
              {this.props.error}
            </div>
          </div>
        </div>
      );
    }
  }

  ```

- Now it's time to update the action UI input update actions, start:

  _./src/pages/student-detail/actions/studentFieldValueChangedStart.ts_

  ```javascript
  import { studentFormValidation } from "../student.validation";
  import { studentFieldValueChangedCompleted } from "./studentFieldValueChangedCompleted";

  export function studentFieldValueChangedStart(viewModel: any, fieldName: string, value: any) {
    return (dispatcher) => {
      studentFormValidation.validateField(viewModel, fieldName, value, event).then(
        dispatcher(studentFieldValueChangedCompleted(fieldName, value ))
      );
    };
  }

  ```

- Completed

  _./src/actions/studentFieldValueChangedCompleted.ts_

  ```javascript
  import { actionsEnums } from "../../../common/actionsEnums";
  import { FieldValidationResult } from "lc-form-validation";

  interface IStudentFieldValueChangedCompletedPayload {
    fieldName: string;
    value: any;
    fieldValidationResult: FieldValidationResult;
  }

  const studentFieldValueChangedCompleted = (fieldName: string, value: string, fieldValidationResult: FieldValidationResult) => {
    return {
      type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
      payload: {
        fieldName,
        value,
        fieldValidationResult
      } as IStudentFieldValueChangedCompletedPayload
    };
  };

  export {
    IStudentFieldValueChangedCompletedPayload,
    studentFieldValueChangedCompleted
  }

  ```

- Let's jump now into the reducer:

  _./src/reducers/student.ts_

  On the import side:

  ```javascript
  import { StudentErrors } from "../model/studentErrors";
  import { IStudentFieldValueChangedCompletedPayload } from "../pages/student-detail/actions/studentFieldValueChangedCompleted";
  ```

  On the reducer state:

  ```javascript
  class StudentState {
    // ...
    editingStudentErrors: StudentErrors;

    public constructor() {
      // ...
      this.editingStudentErrors = new StudentErrors();
    }
  }

  ```

  On reducer handler:

  ```javascript
  const handleFieldValueChanged = (state: StudentState, payload: IStudentFieldValueChangedCompletedPayload) => {
    const newStudent = objectAssign({}, state.editingStudent, {[payload.fieldName]: payload.value});
    const newStudentErrors = objectAssign({}, state.editingStudentErrors, {[payload.fieldName]: payload.fieldValidationResult});
    return objectAssign({}, state, {editingStudent: newStudent, editingStudentErrors: newStudentErrors});
  };
  ```

  Let's jump now on the component side

  _./src/pages/student-detail/components/studentForm.tsx_

  ```jsx
  import { StudentErrors } from "../../../model/studentErrors";

  interface Props  {
    // ...
    errors: StudentErrors;
    fireFieldValueChanged: (viewModel: any, fieldName: string, value: any, filter?: any) => void;
    // ...
  }

  export const StudentForm = (props : Props) => {
    // (...)
    return (
      // (...)
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
      // (...)
    )
  }
  ```

  _./src/pages/student-detail/studentDetail.tsx_

  ```jsx
  // (...)
  import { StudentErrors } from "../../model/studentErrors";

  interface Props  {
    // ...
    errors: StudentErrors;
    fireFieldValueChanged: (viewModel: any, fieldName: string, value: any, filter?: any) => void;
    // ...
  }
  export class StudentDetailComponent extends React.Component<Props, {}> {
    // (...)
      <StudentForm
        // (...)
        errors={this.props.errors}
      />
    // (...)
  ```

  _./src/pages/student-detail/studentDetailContainer.tsx_

  ```javascript
  const mapStateToProps = (state) => {
    return {
      student: state.studentReducer.editingStudent,
      errors: state.studentReducer.editingStudentErrors,
    };
  };
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

  ```
  npm install jquery --save
  npm install toastr --save
  ```

  ```
  npm install @types/toastr --save-dev
  ```

- Le's update webpack config in order to include the toastr styles.

  _./webpack.config.js_

  ```javascript
  entry: [
    './main.tsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
  ],
  ```

- Let's check the status of the form before saving, in case there is an errors
let's display a toast indicating that the form contains errors.

  _./src/pages/student-detail/student.validation.ts_:

  ```javascript
  import { FieldValidationResult, BaseFormValidation } from "lc-form-validation";
  import { requiredValidationHandler } from "../../common/validations/validators";
  import { emailValidationHandler } from "../../common/validations/email";

  class StudentFormValidation extends BaseFormValidation {

    public constructor() {
      super();

      this._validationEngine.initialize([
        { formFieldName: "fullname", vmFieldName: "fullname" },
        { formFieldName: "email", vmFieldName: "email" }
      ]);

      this._validationEngine.addFieldValidation(
        "fullname",
        requiredValidationHandler,
      );

      this._validationEngine.addFieldValidation(
        "email",
        requiredValidationHandler,
      );
    }
  }

  export const studentFormValidation = new StudentFormValidation();

  ```


  _./src/pages/student-detail/actions/studentSaveRequestStart.ts_:

  ```javascript
  import { Promise } from "es6-promise";
  import { actionsEnums } from "../../../common/actionsEnums";
  import { StudentEntity } from "../../../model/student";
  import { studentApi } from "../../../rest-api/student-api";
  import { studentSaveRequestCompleted } from "./studentSaveRequestCompleted";
  import { FormValidationResult } from "lc-form-validation";
  import { studentFormValidation } from "../student.validation";
  import * as toastr from "toastr";

  export const studentSaveRequestStart = (student: StudentEntity) => {

    const saveStudent = (dispatcher, student: StudentEntity) : Promise<boolean> => {
      const promise = studentApi.saveStudent(student);

      promise.then(
        succeeded => {
          dispatcher(studentSaveRequestCompleted(succeeded));
          if (succeeded) {
            toastr.success("Student saved succesfully.");
          }
        }
      );

      return promise;
    };

    return function(dispatcher) {
      let promise = null;

      studentFormValidation.validateForm(student).then(
        (formValidationResult: FormValidationResult) => {
          if (formValidationResult.succeeded === true) {
            saveStudent(dispatcher, student);
          } else {
            toastr.error("Form failed to save, please review the fields content.");
          }
        }
      );

      return promise;
    };
  };

  ```

- Let's give a try and test

  ```
  npm start
  ```

- Just as a last step for this sample, let's add an email validation to the student
email field, we will check that the email is well formed (regex validation). To make
this easy we will install the [validator](https://github.com/chriso/validator.js) library and add a wrapper to integrate
the email validation into the _lc-form-validation_ library.

  ```
  npm install validator --save
  ```

  ```
  npm install @types/validator --save-dev
  ```

> Is expected that lc-form-validation will incorporate in it's library a set of
already made validations


- Let's define an lc-form-validation email validator

  _./src/common/validationsEnums.ts_:

  ```javascript
  export const validationsEnums = {
    EMAIL: {
      NOT_VALID: {
        TYPE: "EMAIL_NOT_VALID",
        MESSAGE: "Not a valid email",
      }
    },
  };
  ```

  _./src/common/validations/email.ts_:

  ```javascript
  import * as isEmail from "validator/lib/isEmail";
  import { FieldValidationResult } from "lc-form-validation";
  import { validationsEnums } from "../common/validationsEnums";

  export const emailValidationHandler = (vm: any, value: any): FieldValidationResult => {
    const isFieldValidEmail: boolean = isEmail(value);
    const errorInfo: string = (isFieldValidEmail) ? "" : validationsEnums.EMAIL.NOT_VALID.MESSAGE;

    const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
    fieldValidationResult.type = validationsEnums.EMAIL.NOT_VALID.TYPE;
    fieldValidationResult.succeeded = isFieldValidEmail;
    fieldValidationResult.errorMessage = errorInfo;

    return fieldValidationResult;
  };

  ```

- Let's add this validation to the login form.

  _./src/pages/login/login.validation.ts_

  ```javascript
  import { emailValidationHandler } from "../../common/validations/email";
  // ...
  this._validationEngine.addFieldValidation(
    "email",
    emailValidationHandler,
  );
  ```
