# 05 Thunk

This sample takes as starting point _05 Refactor_

Let's play with async calls and middleware (redux thunk).

In this sample we are going to display a table, the data will
be retrieve from github api.

Summary steps:

- Let's install the needed package and typescript definitions.
- Let's register our Middleware.
- Let's create a rest api class to access this data.
- Let's define two new actions.
- Let's create an action that will trigger and async action.
- Let's add a new reducer that will hold members state.
- Let's create a memberRow component.
- Let's create a memberTable component.
- Let's create a memberArea component (include a load button).
- Let's create a memberAreaContainer.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- We have to install libraries and typescript definitions to handle fetch calls: core.js and whatwg-fetch

```javascript
npm install core-js --save-dev
```

```javascript
npm install whatwg-fetch --save
```

```javascript
npm install @types/core-js --save-dev
```

```javascript
npm install @types/whatwg-fetch --save-dev
```

- We need to install as well redux-thunk and it's typescript definitions

```javascript
npm install redux-thunk --save
```

```javascript
npm install @types/redux-thunk --save-dev
```

- Let's register Redux-thunk middleware _main.tsx_

```javascript
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers'
import {App} from './app';
import reduxThunk from 'redux-thunk';

let store = createStore(
  reducers,
  applyMiddleware(reduxThunk)
);
```

- Let's create an entity under _./src/model/member.ts

```javascript
export class MemberEntity {
  id: number;
  login: string;
  avatar_url: string;

  constructor() {
    this.id = -1;
    this.login = "";
    this.avatar_url = "";
  }
}
```

- Let's create a rest api class to access this data, under _./src/restApi/memberApi_

```javascript
import {} from 'core-js'
import {} from 'whatwg-fetch';
import {MemberEntity} from '../model/member';


// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {

  // Just return a copy of the mock data
  getAllMembers() : Promise<MemberEntity[]> {
    const gitHubMembersUrl : string = 'https://api.github.com/orgs/lemoncode/members';

    return fetch(gitHubMembersUrl)
    .then((response) => this.checkStatus(response))
    .then((response) => this.parseJSON(response))
    .then((data) => this.resolveMembers(data))
	}

  private checkStatus(response : Response) : Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  private parseJSON(response : Response) : any {
    return response.json();
  }

  private resolveMembers (data : any) : Promise<MemberEntity[]> {

    const members = data.map((gitHubMember) => {
      var member : MemberEntity = new MemberEntity();

      member.id = gitHubMember.id;
      member.login = gitHubMember.login;
      member.avatar_url = gitHubMember.avatar_url;

      return member;
    });


    return Promise.resolve(members);
  }
}

export const memberAPI = new MemberAPI();
```

- It's time to define two new actions _./src/common/actionsEnums.ts_

```javascript
export const actionsEnums = {
  UPDATE_USERPROFILE_NAME : 'UPDATE_USERPROFILE_NAME ',
  UPDATE_USERPROFILE_FAVOURITE_COLOR: 'UPDATE_USERPROFILE_FAVOURITE_COLOR',
  MEMBER_REQUEST_STARTED: 'MEMBER_REQUEST_STARTED',
  MEMBER_REQUEST_COMPLETED: 'MEMBER_REQUEST_COMPLETED',
}
```

- Let's create an action that will inform members once completed:

```javascript
import {actionsEnums} from "../common/actionsEnums";

export const membersRequestCompleted = (members : any) => {
   return {
     type: actionsEnums.MEMBER_REQUEST_COMPLETED,
     members: members
   }
 }
```
- Let's create an action that will trigger an async action.

```javascript
import {memberApi} from '../restApi/memberApi';
import {membersRequestCompleted} from './memberRequestCompleted';

export function memberRequest() {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatcher) {
    const promise = memberApi.getAllMembers();

    promise.then(
      data => dispatcher(membersRequestCompleted(data))
    );

    return  promise;
  };
}
```

- Let's add a new reducer that will hold members state _./src/reducers/memberReducer.ts_.

```javascript
import {actionsEnums} from '../common/actionsEnums';
import {membersRequestCompleted} from '../actions/memberRequestCompleted';
import {MemberEntity} from '../model/member';
import objectAssign = require('object-assign');

class memberState  {
  members : MemberEntity[];

  public constructor()
  {
    this.members = [];
  }
}

export const memberReducer =  (state : memberState = new memberState(), action) => {
      switch (action.type) {
        case actionsEnums.MEMBER_REQUEST_COMPLETED:
           return handleMemberRequestCompletedAction(state, action);
      }

      return state;
};


const handleMemberRequestCompletedAction = (state : memberState, action) => {
  const newState = objectAssign({}, state, {members: action.members});
  return newState;
}
```

- Let's register it _./src/reducers/index.ts_

```javascript
import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
import { memberReducer } from './memberReducer';


export const reducers =  combineReducers({
  userProfileReducer,
  memberReducer
});
```

- Let's create a memberRow component _./src/components/members/memberrow.tsx_.

```javascript
import * as React from 'react';
import {MemberEntity} from '../../model/member';


interface Props  {
  member : MemberEntity;
}

export const MemberRow = (props: Props) => {
     return (
       <tr>
         <td>
           <img src={props.member.avatar_url} className="avatar"/>
         </td>
         <td>
           <span>{props.member.id}</span>
         </td>
         <td>
           <span>{props.member.login}</span>
         </td>
       </tr>
     );
}
```

- Let's create a memberTable component under _./src/components/members/membertable.tsx_.

```javascript
import * as React from 'react';
import {MemberEntity} from '../../model/member';
import {memberApi} from '../../restApi/memberApi';
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
```

- Let's create a memberArea component (include a load button).

```javascript
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
```

- Let's create a memberAreaContainer.

```
import { connect } from 'react-redux';
import { memberRequest } from '../../actions/memberRequest';
import { MembersArea } from './memberArea';


const mapStateToProps = (state) => {
    return {
      members: state.memberReducer.members
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadMembers: () => {return dispatch(memberRequest())},
  }
}


export const MembersPageContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(MembersArea)
```

- Let's create an _./src/members/index.ts_

```javascript
import {MembersAreaContainer} from './memberAreaContainer';

export {
  MembersAreaContainer
}
```

- Let's instantiate it on _app.tsx_

```javascript
import * as React from 'react';
import {HelloWorldContainer} from './components/helloworld'
import {NameEditContainer} from './components/nameEdit';
import {ColorDisplayerContainer, ColorPickerContainer} from './components/color';
import {MembersAreaContainer} from './components/members';

export const App = () => {
  return (
    <div>
      <MembersAreaContainer/>
      <br/>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
      <br/>
      <ColorDisplayerContainer/>
      <br/>
      <ColorPickerContainer/>
    </div>
  );
}
```

- Let's give a try.

```javascript
npm start
```
