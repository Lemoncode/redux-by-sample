import { combineReducers} from 'redux';
import { userProfileReducer, UserProfileState } from './userProfile';

interface State {
  userProfileReducer : UserProfileState;
};

export const reducers = combineReducers<State>({
  userProfileReducer
});
