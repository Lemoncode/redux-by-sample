import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
import { memberReducer } from './memberReducer';

export const reducers =  combineReducers({
  userProfileReducer,
  memberReducer,
});
