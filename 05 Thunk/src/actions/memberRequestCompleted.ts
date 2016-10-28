import {actionsEnums} from "../common/actionsEnums";

export const membersRequestCompleted = (members : any) => {
   return {
     type: actionsEnums.MEMBER_REQUEST_COMPLETED,
     members: members
   }
 }
