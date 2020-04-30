import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import {history} from '../helpers';

export const userActions = {
    signOut,
    signUp,
    signIn,
};

function signOut() {
    userService.signOut();
    return { type: userConstants.SIGN_OUT };
}

function signUp(user) {
    const request = (user) => ({ type: userConstants.SIGN_UP_REQUEST, user });
    const success = (user) => ({ type: userConstants.SIGN_UP_SUCCESS, user });
    const failure = (msg) => ({ type: userConstants.SIGN_UP_FAILURE, msg });

    return dispatch => {
        dispatch(request(user));

        userService.signUp(user)
            .then(
                responseData => {
                    dispatch(success());
                    history.push('/signin');
                    dispatch(alertActions.success('Sign up successful. Please sign in to continue.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function signIn(user) {
    const {username, password} = user;
    const request = (user) => ({type: userConstants.SIGN_IN_REQUEST, user});
    const success = () => ({type: userConstants.SIGN_IN_SUCCESS});
    const failure = (msg) => ({type: userConstants.SIGN_IN_FAILURE, msg});

    return dispatch => {
        dispatch(request({username}));

        userService.signIn({username, password})
            .then(
                responseData => {
                    dispatch(success());
                    history.push('/candidates');
                },
                error => {
                    const errorStr = error.toString();
                    dispatch(failure(errorStr));
                    dispatch(alertActions.error(errorStr));
                }
            );
    };
}

