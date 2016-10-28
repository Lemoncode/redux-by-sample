import * as React from 'react';
import {MemberEntity} from '../../model/member';
import {memberApi} from '../../restApi/memberApi';
import {MembersTable} from './memberstable';

interface Props {
  loadMembers : () => any;
  members : Array<MemberEntity>;
}

export class MembersArea extends React.Component<Props, {}> {

  constructor(props : Props) {
        super(props);
        this.state = {members: []};
  }

  onLoadMembers() {
    this.props.loadMembers();
  }

  public render() {
       return (
         <div>
            <MembersTable members={this.props.members}/>
            <br/>
            <input type="submit" value="Load" className="btn btn-default" onClick={this.onLoadMembers.bind(this)}/>
         </div>
       );
  }
}
