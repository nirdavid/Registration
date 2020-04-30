// My reference was https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

export const isCookieExists = (name = 'token') =>
    (document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`)));

export const resetCookie = (name = 'token') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const setCookie = (name='token', value) => {
    document.cookie = `${name}=${value}`;
};

export const getTokenCookie = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
};
