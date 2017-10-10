# 05 Thunk

This sample takes as its starting point "_05 Refactor_"

Let's play with async calls and middleware (redux thunk).

In this sample we are going to display a table, the data for which will
be retrieved from github api.

Summary steps:

- Let's register our Middleware.
- Let's create a rest api class to access this data.
- Let's define two new actions.
- Let's create an action that will trigger an async action.
- Let's add a new reducer that will hold members state.
- Let's create a memberRow component.
- Let's create a memberTable component.
- Let's create a memberArea component (including a load button).
- Let's create a memberAreaContainer.



# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- We need to install redux-thunk and it's typescript definitions as well.

```
npm install redux-thunk --save
npm install @types/redux-thunk --save-dev

```

- Let's register Redux-thunk middleware in `main.tsx`

### ./src/main.tsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import { createStore } from 'redux';
+ import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers';
import {App} from './app';
+ import reduxThunk from 'redux-thunk';

- let store = createStore(reducers);
+ let store = createStore(
+   reducers,
+   applyMiddleware(reduxThunk),
+ );

...
```

- Let's create an entity under _./src/model/member.ts_

### ./src/model/member.ts
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

- Let's create a rest api class to access this data, under `./src/api/member.ts`

### ./src/api/member.ts
```javascript
import {MemberEntity} from '../model/member';

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

- It's time to define two new actions `./src/common/actionsEnums.ts`

### ./src/common/actionsEnums.ts
```diff
export const actionsEnums = {
  UPDATE_USERPROFILE_NAME: "UPDATE_USERPROFILE_NAME",
  UPDATE_USERPROFILE_FAVOURITE_COLOR: "UPDATE_USERPROFILE_FAVOURITE_COLOR",
+ MEMBER_REQUEST: 'MEMBER_REQUEST',
+ MEMBER_REQUEST_COMPLETED: 'MEMBER_REQUEST_COMPLETED'
};

```

- Let's create an action that will inform members once completed:

### ./src/actions/memberRequest.ts
```javascript
import {actionsEnums} from '../common/actionsEnums';
import {MemberEntity} from '../model/member';

export const memberRequestCompleted = (members: MemberEntity[]) => {
    return {
        type: actionsEnums.MEMBER_REQUEST_COMPLETED,
        members: members
    }
}

```

- Then we will add the action that will trigger an async action. We will do that at the same file:

### ./src/actions/memberRequest.ts
```diff
import {actionsEnums} from '../common/actionsEnums';
import {MemberEntity} from '../model/member';
+ import {memberAPI} from '../api/member';

export const memberRequestCompleted = (members: MemberEntity[]) => {
    return {
        type: actionsEnums.MEMBER_REQUEST_COMPLETED,
        members: members
    }
}

+ export const memberRequest = () => (dispatcher) =>{
+   const promise = memberAPI.getAllMembers();

+   promise.then(
+     (data) => dispatcher(memberRequestCompleted(data))
+   );

+   return promise;
+ }

```

- Let's add a new reducer that will hold members state `./src/reducers/memberReducer.ts`.

### ./src/reducers/memberReducer.ts
```javascript
import {actionsEnums} from '../common/actionsEnums';
import {MemberEntity} from '../model/member';

class memberState  {
  members : MemberEntity[];

  constructor() {
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
  return {
    ...state,
    members: action.members,
  };
}

```

- Let's register it `./src/reducers/index.ts`

### ./src/reducers/index.ts
```diff
import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
+ import { memberReducer } from './memberReducer';

export const reducers =  combineReducers({
- userProfileReducer
+ userProfileReducer,
+ memberReducer,
});

```

- Let's create a memberRow component `./src/components/members/memberRow.tsx`.

### ./src/components/members/memberRow.tsx
```javascript
import * as React from 'react';
import {MemberEntity} from '../../model/member';

interface Props  {
  member : MemberEntity;
}

export const MemberRowComponent = (props: Props) => {
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

- Let's create a memberTable component under `./src/components/members/memberTable.tsx`.

### ./src/components/members/memberTable.tsx
```javascript
import * as React from 'react';
import {MemberEntity} from '../../model/member';
import {MemberRowComponent} from './memberRow';

interface Props {
    members: MemberEntity[];
}

export const MembersTableComponent = (props: Props) => {
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
```

- Let's create a memberArea component (include a load button).

### ./src/components/members/memberArea.tsx
```javascript
import * as React from 'react';
import {MemberTableComponent} from './memberTable';
import {MemberEntity} from '../../model/member'

interface Props {
  members: Array<MemberEntity>;
  loadMembers: () => any;
}

export const MemberAreaComponent = (props : Props) => {
  return (
  <div>
      <MemberTableComponent members={props.members}/>
      <br/>
      <input type="submit"
              value="load"
              className="btn btn-default"
              onClick={() => props.loadMembers()}
      />
  </div>
  );
}

```

- Let's create a memberAreaContainer.

### ./src/components/members/memberAreaContainer.tsx
```javascript
import { connect } from 'react-redux';
import { memberRequest } from '../../actions/memberRequest';
import { MemberAreaComponent } from './memberArea';

const mapStateToProps = (state) => {
  return{
      members: state.memberReducer.members
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMembers: () => {return dispatch(memberRequest())}
  };
}

export const MembersAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberAreaComponent);

```

- Let's create an `./src/members/index.ts`

### ./src/components/members/index.tsx
```javascript
import {MembersAreaContainer} from './memberAreaContainer';

export {
  MembersAreaContainer
}

```

- Let's instantiate it on _app.tsx_

```diff
import * as React from 'react';
import { HelloWorldContainer } from './components/helloworld';
import { NameEditContainer } from './components/nameEdit';
import { ColorDisplayerContainer } from './components/color';
import { ColorPickerContainer } from './components/color';
+ import {MembersAreaContainer} from './components/members';

export const App = () => {
  return (
    <div>
+     <MembersAreaContainer/>
+     <br/>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
      <br/>
      <ColorDisplayerContainer/>
      <br/>
      <ColorPickerContainer/>
    </div>
  );
};

```

- Let's give a try.

```javascript
npm start
```
