import {authHeader} from "../helpers";
import {handleResponse} from "./userService";
import {prefix} from "./consts";

export const candidateService = {
    getCandidates,
};

function getCandidates() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${prefix}/candidates`, requestOptions).then(handleResponse);
}
