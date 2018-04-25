import * as React from 'react';
import {MemberEntity} from '../../../model/member';
import {MemberRowComponent} from './memberRow';

interface Props {
    members: MemberEntity[];
}

export const MemberTableComponent = (props: Props) => {
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
                props.members.map((member: MemberEntity) =>
                    <MemberRowComponent key={member.id} member={member}/>
                )
            }
          </tbody>
        </table>
      </div>
  );
}
