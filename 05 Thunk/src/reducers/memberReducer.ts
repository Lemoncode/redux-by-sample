import {actionsEnums} from '../common/actionsEnums';
import {MemberEntity} from '../model/member';

class memberState  {
  members : MemberEntity[];

  constructor()
  {
    this.members = [];
  }
}

export const memberReducer =  (state : memberState = new memberState(), action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action);
  }

  return state;
};


const handleMemberRequestCompletedAction = (state : memberState, action) => {
  return {
    ...state,
    members: action.members,
  };
}
