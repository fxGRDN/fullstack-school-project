//https://blog.logrocket.com/localstorage-javascript-complete-guide/
export function setCookie(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function getCookie(key) {
    if (localStorage[key]) {
        return JSON.parse(localStorage[key]);
    }
    else
        console.warn(`No such ${key} key exists`);
    return false;
}
export function destroyCookie(key) {
    localStorage.removeItem('key');
}
export function setSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}
export function getSession(key) {
    if (sessionStorage[key]) {
        return JSON.parse(sessionStorage[key]);
    }
    else
        throw new Error('no such key exists');
}
export function destroySession(key) {
    sessionStorage.removeItem('key');
}
