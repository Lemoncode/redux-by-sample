import * as React from 'react';
import {MembersTable} from './memberstable';
import {MemberEntity} from '../../model/member'

interface Props {
    members: Array<MemberEntity>;
    loadMembers: () => any;
}

export const MembersArea = (props : Props) => {
    return (
    <div>
        <MembersTable members={props.members}/>
        <br/>
        <input type="submit"
                value="load"
                className="btn btn-default"
                onClick={() => props.loadMembers()}
        />
    </div>
    );      
}
