import { combineReducers } from 'redux';
import { sessionReducer, SessionState } from './session';

export interface State {
  session: SessionState;
}

export const reducers = combineReducers({
  session: sessionReducer,
});
