# 16 Observables

This sample takes as starting point _04 Refactor_

Let's play with async calls and epic middleware (redux observables).

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

Additional step:

- Let's define two new actions (ajax-with-delay and cancel).

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _04 Refactor_ and execute:

  ```bash
  npm install
  ```

- We have to install libraries and typescript definitions to handle fetch calls: redux-observable, rx and rxjs

```bash
npm install --save-dev redux-observable rx rxjs @types/rx @types/es6-shim
```

- Let's register a Redux Epic Middleware in _./src/store.ts_

```javascript
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { reducers } from "./reducers/";

const epicMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(epicMiddleware),
  ),
);

```

- And use the store in _./src/main.tsx_

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./app";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

```

- Let's create an entity under _./src/model/member.ts_

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

- Let's create an epic to access this data, under _./src/epics/fetchMembersEpic.ts_

```javascript
import 'rxjs';

// merge all actions in only one action
import { } from "rxjs/add/operator/mergeMap";

// map to throw a new action
import { } from "rxjs/add/operator/map";

import { actionsEnums } from "../common/actionsEnums";
import { memberRequestCompleted } from "../actions/";
import { memberAPI } from "../restApi/memberApi";

// the dollar symbol in the action$ param is just a convention
export const fetchMembersEpic = action$ =>
  // action param is not necesary, but it will be useful
  //   to better understand the code
  action$.ofType(actionsEnums.MEMBER_REQUEST_STARTED).mergeMap(action =>
    memberAPI.getAllMembers()
      // memberRequestCompleted will be only an action ({type: '...', ...})
      // without "black magic" for promises
      .map(memberRequestCompleted)
  );

```

_./src/epics/index.ts_

```javascript
import { combineEpics } from "redux-observable";

import { fetchMembersEpic } from "./fetchMembersEpic";

export const rootEpic = combineEpics(fetchMembersEpic);
```

- Let's create a rest api class to access this data with rxjs-observable-ajax, under _./src/restApi/memberApi.ts_

```javascript
import { ajax } from "rxjs/observable/dom/ajax";

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  getAllMembers() {
    return (
      ajax.getJSON("https://api.github.com/orgs/lemoncode/members")
    );
  }
}

export const memberAPI = new MemberAPI();
```

- Create _./src/actions/memberRequest.ts_

```javascript
import { actionsEnums } from "../common/actionsEnums";

export const memberRequest = () => {
  return {
    type: actionsEnums.MEMBER_REQUEST_STARTED,
  };
};
```

- It's time to define two new actions _./src/common/actionsEnums.ts_

```javascript
export const actionsEnums = {
  UPDATE_USERPROFILE_NAME: "UPDATE_USERPROFILE_NAME",
  UPDATE_USERPROFILE_FAVOURITE_COLOR: "UPDATE_USERPROFILE_FAVOURITE_COLOR",
  MEMBER_REQUEST_STARTED: "MEMBER_REQUEST_STARTED",
  MEMBER_REQUEST_COMPLETED: "MEMBER_REQUEST_COMPLETED",
};

```

- Let's create an *simple* action that will inform members once completed in _./src/actions/memberRequestCompleted.ts_

```javascript
import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";

export const memberRequestCompleted = (members: MemberEntity[]) => {
  // without "black magic" promises! MUAHAHAHAH!
  return {
    type: actionsEnums.MEMBER_REQUEST_COMPLETED,
    members: members,
  };
};

```

- And _./src/actions/index.ts_ to use easily:

```javascript
import { memberRequestCompleted } from "./memberRequestCompleted";
import { memberRequest } from "./memberRequest";

export { memberRequest, memberRequestCompleted };
```

- Let's add a new reducer that will hold members state

_./src/reducers/memberReducer.ts_

```javascript
import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";
import objectAssign = require("object-assign");

class memberState  {
  members: MemberEntity[];

  public constructor() {
    this.members = [];
  }
}

export const memberReducer =  (state: memberState = new memberState(), action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action);
  }

  return state;
};


const handleMemberRequestCompletedAction = (state: memberState, action) => {
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
  memberReducer,
});
```

- Let's create a `memberRow` component _./src/components/members/memberRow.tsx_

```jsx
import * as React from "react";
import { MemberEntity } from "../../model/member";

interface Props  {
  member: MemberEntity;
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

- Let's create a memberTable component under _./src/components/members/memberTable.tsx_

```jsx
import * as React from "react";
import { MemberEntity } from "../../model/member";
import { MemberRow } from "./memberRow";

interface Props {
  members: MemberEntity[];
}

export const MembersTable = (props: Props) => {
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
            props.members.map((member) =>
              <MemberRow key={member.id} member={member}/>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

```

- Let's create a memberArea component (include a load button) in _./src/components/members/memberArea.tsx_

```jsx
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

```

- Let's create a memberAreaContainer.

_./src/components/members/memberAreaContainer.ts_

```javascript
import { connect } from "react-redux";
import { memberRequest } from "../../actions/memberRequest";
import { MembersArea } from "./memberArea";

const mapStateToProps = (state) => {
  return {
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
  mapDispatchToProps,
)(MembersArea)

```

- Let's create an _./src/components/members/index.ts_

```javascript
import { MembersAreaContainer } from './memberAreaContainer';

export {
  MembersAreaContainer
}

```

- Let's instantiate it on _app.tsx_

```jsx
import * as React from "react";
import { MembersAreaContainer } from './components/members';
import { HelloWorldContainer } from "./components/helloworld";
import { NameEditContainer } from "./components/nameEdit";
import { ColorDisplayerContainer } from "./components/color";
import { ColorPickerContainer } from "./components/color";

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
};

```

- Let's give a try.

```shell
npm start
```
