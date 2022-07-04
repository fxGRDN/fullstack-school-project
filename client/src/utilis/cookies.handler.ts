//https://blog.logrocket.com/localstorage-javascript-complete-guide/


export function setCookie(key:string, value:object) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getCookie(key:string){
    if(localStorage[key]) {
        return JSON.parse(localStorage[key]);
    }
    else console.warn(`No such ${key} key exists`);
    return false
    
    
}

export function destroyCookie(key:string){
    localStorage.removeItem('key');
}

export function setSession(key:string, value:object) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSession(key:string){
    if(sessionStorage[key]) {
        return JSON.parse(sessionStorage[key]);
    }
    else throw new Error('no such key exists');
    
}

export function destroySession(key:string){
    sessionStorage.removeItem('key');
}