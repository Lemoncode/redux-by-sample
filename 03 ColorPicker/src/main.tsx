import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {reducers} from "./reducers";
import {App} from "./app";

let store = createStore(reducers);

ReactDOM.render(
   <Provider store={store}>
    <App/>
   </Provider>,
   document.getElementById("root")
 );
