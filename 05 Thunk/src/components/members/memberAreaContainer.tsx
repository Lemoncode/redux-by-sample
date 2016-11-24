import { connect } from 'react-redux';
import { memberRequest } from '../../actions/memberRequest';
import { MembersArea } from './memberArea';


const mapStateToProps = (state) => {
    return{
        members: state.memberReducer.members
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMembers: () => {return dispatch(memberRequest())}
    };
}

export const MembersAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MembersArea)