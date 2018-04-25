import {actionsEnums} from '../common/actionsEnums';
import {MemberEntity} from '../model/member';

export type MemberState =  MemberEntity[];

export const memberReducer =  (state : MemberState = [], action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action.payload);
  }

  return state;
};

const handleMemberRequestCompletedAction = (state : MemberState, members : MemberState) => {
  return members;
}
