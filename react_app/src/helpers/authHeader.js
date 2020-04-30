import {getTokenCookie} from "./cookie";

export function authHeader() {
    // get authorization header with jwt token
    const token = getTokenCookie();
    return token ? { 'Authorization': 'Bearer ' + token } : {};
}