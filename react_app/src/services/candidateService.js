import {authHeader} from "../helpers";
import {handleResponse} from "./userService";
import {prefixApi} from "./consts";

export const candidateService = {
    getCandidates,
};

function getCandidates() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${prefixApi}/candidates`, requestOptions).then(handleResponse);
}
