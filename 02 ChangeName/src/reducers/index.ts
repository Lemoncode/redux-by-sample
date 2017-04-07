import { combineReducers } from 'redux';
import { userProfileReducer } from './userProfile';
import { Provider } from 'react-redux';

export const reducers =  combineReducers({
  userProfileReducer
});
