import * as React from 'react';
import {MemberEntity} from '../../model/member';
import {MemberRow} from './memberRow';

interface Props extends React.Props<MembersTable> {
  members : Array<MemberEntity>
}

export class MembersTable extends React.Component<Props, {}> {

  constructor(props : Props){
        super(props);
  }

   public render() {

       return (
        <div className="row">
          <h2> Members Page</h2>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Avatar
                </th>
                <th>
                  Id
                </th>
                <th>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.members.map((member : MemberEntity) =>
                  <MemberRow key={member.id} member = {member}/>
                )
              }
            </tbody>
          </table>
        </div>
       );
  }
}
