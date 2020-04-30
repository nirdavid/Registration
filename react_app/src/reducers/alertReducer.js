import { alertConstants } from '../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        msg: action.msg
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        msg: action.msg
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}