import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { domain, Domain } from './domain';
import { logic, Logic } from './logic';

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
