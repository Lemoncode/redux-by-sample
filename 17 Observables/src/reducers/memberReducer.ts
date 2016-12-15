import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";
import objectAssign = require("object-assign");

class memberState  {
  members: MemberEntity[];

  public constructor() {
    this.members = [];
  }
}

export const memberReducer =  (state: memberState = new memberState(), action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action);
  }

  return state;
};


const handleMemberRequestCompletedAction = (state: memberState, action) => {
  const newState = objectAssign({}, state, {members: action.members});
  return newState;
}
