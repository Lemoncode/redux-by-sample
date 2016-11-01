import { connect } from 'react-redux';
import { StudentDetailComponent } from './studentDetail';

const mapStateToProps = (state) => {
    return {
      student : state.studentReducer.editingStudent
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const StudentDetailContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(StudentDetailComponent);
