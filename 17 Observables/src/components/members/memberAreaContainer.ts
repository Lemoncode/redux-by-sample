import { connect } from "react-redux";
import { memberRequest, memberRequestCancelled } from "../../actions/";
import { MembersArea } from "./memberArea";

const mapStateToProps = (state) => {
  return {
    members: state.memberReducer.members,
    members_loading: state.memberReducer.members_loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMembers: () => {return dispatch(memberRequest())},
    cancelLoadMembers: () => {return dispatch(memberRequestCancelled())},
  };
}

export const MembersAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembersArea)
