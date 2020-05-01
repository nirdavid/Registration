import {prefixApiAuth} from "./consts";
import {resetCookie, setCookie} from "../helpers";

export const userService = {
    signOut,
    signUp,
    signIn,
};

function signOut() {
    resetCookie('token');
}

const getRequestOptions = (user) => {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
};

function signUp(user) {
    return fetch(`${prefixApiAuth}/signup`, getRequestOptions(user)).then(handleResponse);
}

function signIn(user) {
    return fetch(`${prefixApiAuth}/signin`, getRequestOptions(user))
        .then(handleResponse)
        .then(responseData => {
            // store jwt token in cookie to keep user logged in between page refreshes
            setCookie('token', responseData.token);
            return responseData;
        });
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 UNAUTHORIZED response returned from api
                signOut();
            }

            const error = (data && data.msg) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}