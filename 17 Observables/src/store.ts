import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { reducers } from "./reducers/";

const epicMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(epicMiddleware),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  ),
);
