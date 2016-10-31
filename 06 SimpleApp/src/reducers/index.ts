import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux'

export const reducers =  combineReducers({
  userProfileReducer,
  routing: routerReducer
});
