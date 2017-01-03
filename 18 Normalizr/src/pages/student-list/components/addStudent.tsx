import * as React from 'react';

interface Props {
  navigateToAddNewStudent: () => void;
}

export const AddStudentComponent = (props: Props) => {
  return(
    <div className="col-xs-12" onClick={props.navigateToAddNewStudent}>
      <button className="btn btn-default">
        <span className="glyphicon glyphicon-plus" /> Add new student
      </button>
    </div>
  );
}
