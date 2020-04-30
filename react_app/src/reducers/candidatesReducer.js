import {candidatesConstants} from "../constants";

export function candidates(state = {}, action) {
  switch (action.type) {
    case candidatesConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case candidatesConstants.GET_ALL_SUCCESS:
      return {
        items: action.candidates
      };
    case candidatesConstants.GET_ALL_FAILURE:
      return {
        msg: action.msg
      };
    default:
      return state
  }
}