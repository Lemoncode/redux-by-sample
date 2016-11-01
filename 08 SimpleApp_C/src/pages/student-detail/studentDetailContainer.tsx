import { connect } from 'react-redux';
import { StudentDetailComponent } from './studentDetail';
import { getStudentRequestStartAction} from './actions/getStudentRequestStart';

const mapStateToProps = (state) => {
    return {
      student : state.studentReducer.editingStudent
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getstudent: (id : number) => dispatch(getStudentRequestStartAction(id))
  }
}

export const StudentDetailContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentDetailComponent);
