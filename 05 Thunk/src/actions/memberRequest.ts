import {actionsEnums} from "../common/actionsEnums";
import {MemberEntity} from '../model/member';
import {memberApi} from '../restApi/memberApi';

export const memberRequestCompleted = (members: MemberEntity[]) => {
    return {
        type: actionsEnums.MEMBER_REQUEST_COMPLETED,
        members: members 
    }
}

export function memberRequest(){
    return function(dispatcher){
        const promise = memberApi.getAllMembers();

        promise.then(
            (data) => dispatcher(memberRequestCompleted(data))
        );
        return promise;
    }
}