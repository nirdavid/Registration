import { userConstants } from '../constants';

export function signUp(state = {}, action) {
  switch (action.type) {
    case userConstants.SIGN_UP_REQUEST:
      return {registering: true};
    case userConstants.SIGN_UP_SUCCESS:
    case userConstants.SIGN_UP_FAILURE:
      return {};
    default:
      return state
  }
}