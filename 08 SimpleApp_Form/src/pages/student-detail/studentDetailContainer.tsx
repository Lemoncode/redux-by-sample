import { connect } from 'react-redux';
import { StudentDetailComponent } from './studentDetail';
import { getStudentRequestStartAction } from './actions/getStudentRequestStart';
import { studentFieldValueChangedStart } from './actions/studentFieldValueChangedStart';
import { studentSaveRequestStart } from './actions/studentSaveRequestStart';
import { StudentEntity } from '../../model/student';

const mapStateToProps = (state) => {
    return {
      student : state.studentReducer.editingStudent
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getstudent: (id : number) => dispatch(getStudentRequestStartAction(id)),
    saveStudent : (student : StudentEntity) => dispatch(studentSaveRequestStart(student)),
    fireFieldValueChanged: (viewModel : any,
                            fieldName : string,
                            value : any) => dispatch(studentFieldValueChangedStart(viewModel, fieldName, value))
  }
}

export const StudentDetailContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentDetailComponent);
