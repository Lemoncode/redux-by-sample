import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";
import objectAssign = require("object-assign");

class memberState  {
  members: MemberEntity[];
  members_loading: boolean;

  public constructor() {
    this.members = [];
    this.members_loading = false;
  }
}

const handleMemberRequestCompletedAction = (state: memberState, action) => {
  const newState = objectAssign({}, state, { members_loading: false, members: action.members });
  return newState;
}

const handleMemberRequestStartedAction = (state: memberState, action) => {
  const newState = objectAssign({}, state, { members_loading: true });
  return newState;
}

const handleMemberRequestCancelledAction = (state: memberState, action) => {
  const newState = objectAssign({}, state, { members_loading: false });
  return newState;
}

export const memberReducer =  (state: memberState = new memberState(), action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_STARTED:
      return handleMemberRequestStartedAction(state, action);
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action);
    case actionsEnums.MEMBER_REQUEST_CANCELLED:
      return handleMemberRequestCancelledAction(state, action);
  }

  return state;
};
