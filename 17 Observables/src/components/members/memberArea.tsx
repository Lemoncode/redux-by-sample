import * as React from 'react';
import { MembersTable } from './memberTable';
import { MemberEntity } from '../../model/member'

interface Props {
  loadMembers: () => any;
  cancelLoadMembers: () => any;
  members: Array<MemberEntity>;
  members_loading: boolean;
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
        <div className="btn-group">
          <button
            type="submit"
            className="btn btn-default"
            onClick={() => this.props.loadMembers()}
          >
            {
              this.props.members_loading ?
              'loading...'
              :
              'load'
            }
          </button>
          {
            this.props.members_loading ?
            <button
              className="btn btn-danger"
              onClick={() => this.props.cancelLoadMembers()}
            >
              cancelar
            </button>
            :
            ''
          }
        </div>
      </div>
    );
  }
}
