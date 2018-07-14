import { combineEpics } from "redux-observable";

import { fetchMembersEpic } from "./fetchMembersEpic";

export const rootEpic = combineEpics(fetchMembersEpic);
