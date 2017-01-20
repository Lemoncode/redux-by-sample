import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { logic, Logic } from './logic';
import { domain, Domain } from './domain';

export interface State {
  domain: Domain;
  logic: Logic;
  routing: any;
}
export const reducers =  combineReducers<State>({
  domain,
  logic,
  routing: routerReducer,
});
