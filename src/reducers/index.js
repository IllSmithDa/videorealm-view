import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
  userObject: UserReducer,
  loginState: LoginReducer,
});

export default rootReducer;
