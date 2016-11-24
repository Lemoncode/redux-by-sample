import { combineReducers } from 'redux';
import { sessionReducer } from './session';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux'
import { studentReducer} from './student';

export const reducers =  combineReducers({
  sessionReducer,
  studentReducer,
  routing: routerReducer
});
