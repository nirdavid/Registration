import { userConstants } from '../constants';

export function signIn(state = {}, action) {
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