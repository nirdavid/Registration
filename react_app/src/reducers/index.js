import { combineReducers } from 'redux';
import { signIn } from './signinReducer';
import { signUp } from './signupReducer';
import { candidates } from './candidatesReducer';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
  signIn,
  signUp,
  candidates,
  alert
});

export default rootReducer;