import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function signIn(state = initialState, action) {
  switch (action.type) {
    case userConstants.SIGN_IN_REQUEST:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        //user: action.user //future feature
      };
    case userConstants.SIGN_IN_FAILURE:
    case userConstants.SIGN_OUT:
      return {};
    default:
      return state
  }
}