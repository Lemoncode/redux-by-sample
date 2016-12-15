import * as React from 'react';
import { MembersTable } from './memberTable';
import { MemberEntity } from '../../model/member'

interface Props {
  loadMembers: () => any;
  members: Array<MemberEntity>;
}

export class MembersArea extends React.Component<Props, {}> {
  constructor(props: Props){
    super(props);

    this.state = {members:[]};
  }

  render(){
    return (
      <div>
        <MembersTable members={this.props.members}/>
        <br/>
        <input
          type="submit"
          value="load"
          className="btn btn-default"
          onClick={() => this.props.loadMembers()}
        />
      </div>
    );
  }
}
