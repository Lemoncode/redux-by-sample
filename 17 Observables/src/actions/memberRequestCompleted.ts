import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";

export const memberRequestCompleted = (members: MemberEntity[]) => {
  // without "black magic" promises! MUAHAHAHAH!
  return {
    type: actionsEnums.MEMBER_REQUEST_COMPLETED,
    members: members,
  };
};
