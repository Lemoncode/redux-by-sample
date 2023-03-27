import 'rxjs';


// merge all actions in only one action
import { } from "rxjs/add/operator/mergeMap";

// map to throw a new action
import { } from "rxjs/add/operator/map";

// delay the getAllMembers ajax petition
import { } from "rxjs/add/operator/delay";

import { actionsEnums } from "../common/actionsEnums";
import { memberRequestCompleted } from "../actions/";
import { memberAPI } from "../restApi/memberApi";

// the dollar symbol in the action$ param is just a convention
export const fetchMembersEpic = action$ =>
  // action param is not necesary, but it will be useful
  //   to better understand the code
  action$.ofType(actionsEnums.MEMBER_REQUEST_STARTED).mergeMap(action =>
    memberAPI.getAllMembers()
      // Asynchronously wait 2000ms then continue
      .delay(2000)
      // memberRequestCompleted will be only an action ({type: '...', ...})
      // without "black magic" for promises
      .map(memberRequestCompleted)
      .takeUntil(action$.ofType(actionsEnums.MEMBER_REQUEST_CANCELLED))
  );
