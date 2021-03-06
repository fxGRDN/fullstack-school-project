import { getTemplate } from "../utilis/fetch.handler.js";
import { getCookie, setCookie, setSession } from "../utilis/cookies.handler.js";
import { view_home } from './home.module.js';
import { UserDBData } from '../interfaces/login.interface.js';
import { INPUT_TARGET } from '../main.js';
import { EMAIL_REGEX } from "../utilis/global.var.js";
import { fetchData } from "../utilis/response.handler.js";
import { messageWidnow, emmitError, valueOK } from "../utilis/error.handler.js";


export const view_login = (entry_point: Element) => {
    getTemplate("login.page").then((html_content) => {
        entry_point.appendChild(html_content);
        comp_login(html_content)
    });
};

const comp_login = async (entry_point: Element) => {

    getTemplate("login").then((comp) => {
        entry_point.appendChild(comp);


        const login = comp.querySelector(".login")!,
            REGISTER = comp.querySelector(".register")!,
            login_input: HTMLInputElement = comp.querySelector('#login')!,
            passwd_input: HTMLInputElement = comp.querySelector('#passwd')!,
            REMEMBER_LOGIN: HTMLInputElement = comp.querySelector('#rem_log')!,
            REMEMBER_PASSWD: HTMLInputElement = comp.querySelector('#rem_pass')!;

        let login_value: string, passwd_value: string;

        if (getCookie('user')) {
            login_input.value = login_value = getCookie('user').login;
            passwd_input.value = passwd_value = getCookie('user').passwd;
            REMEMBER_LOGIN.checked = getCookie('user').rem_log;
            REMEMBER_PASSWD.checked = getCookie('user').rem_pass;
        } else {
            login_input.value = login_value = "";
            passwd_input.value = passwd_value = "";
        }

        REGISTER.addEventListener('click',  () => {
            comp.remove();
            comp_register(entry_point)
        })


        login_input.addEventListener('input', (e) => login_value = (<HTMLInputElement>e.target).value);
        passwd_input.addEventListener('input', (e) => passwd_value = (<HTMLInputElement>e.target).value);

        login?.addEventListener('click', async (e) => {
            try {
                const response = await connect(login_value, passwd_value);

                if (response.ok) {
                    const data = await response.json();

                    if (data.logged) {
                        setCookie('user', {
                            login: REMEMBER_LOGIN.checked ? login_value : "",
                            passwd: REMEMBER_PASSWD.checked ? passwd_value : "",
                            rem_log: REMEMBER_LOGIN.checked,
                            rem_pass: REMEMBER_PASSWD.checked
                        })

                        setSession('user', <UserDBData>{
                            id: data.id,
                            login: login_value,
                            admin: data.admin
                        })
                        entry_point.remove();
                        view_home(INPUT_TARGET);
                    }

                } else {
                    messageWidnow(<HTMLDivElement>e.target, "Z??e has??o lub login");
                }
                           
                    
                } catch (err) {
                    console.log(err);
                    
                } 
                
        })


    })
}

const comp_register = (target: Element) => {
    getTemplate('register').then( comp => {
        target.appendChild(comp);

        const   INPUT_LOGIN = comp.querySelector('#login')!,
                INPUT_EMAIL = comp.querySelector('#email')!,
                INPUT_PASS_1 = comp.querySelector('#pass1')!,
                INPUT_PASS_2 = comp.querySelector('#pass2')!,
                REGISTER = comp.querySelector('.register')!,
                LOGIN = comp.querySelector('.login')!;

        
        LOGIN.addEventListener('click', () => {
            comp.remove();
            comp_login(target);
        })

        const INPUT_ARR = [INPUT_LOGIN, INPUT_EMAIL, INPUT_PASS_1, INPUT_PASS_2];

        const INPUT_VAL = {
            login: null,
            email: null,
            pass1: null,
            pass2: null

        }

        const errorMap: Map<string, boolean> = new Map();
        errorMap.set('login', false);
        errorMap.set('email', false);
        errorMap.set('pass1', false);
        errorMap.set('pass2', false);
        
        INPUT_ARR.forEach( INPUT => INPUT.addEventListener('keyup', (e) => { 
            handleInput( (<HTMLInputElement>e.target).value, (<HTMLInputElement>e.target).name, (<HTMLInputElement>e.target), errorMap, INPUT_VAL)
            }
        ))


        REGISTER.addEventListener('click', (e) => {
            registerAcc(INPUT_VAL, errorMap, e);
        })

})}


async function connect(login: string, passwd: string) {
    let form = new FormData();
    form.append('l', login);
    form.append('p', passwd);

    const response = await fetch('server/validateLogin.php', {
        method: 'POST',
        body: form
    })
    return response

}

const handleInput = (value:string, type:string, target: HTMLInputElement, error_map: Map<string, boolean>, input_val: any) => {
    input_val[type] = value;
    error_map.set(type, false);
    if(value.length < 8  || value.length > 32) {
        emmitError(target);
        messageWidnow(target, "Za kr??tki lub za d??ugi ci??g znak??w");
        return
    }

    switch(type){
        
        case 'login': {    
            if(!value.match(/^[a-zA-Z0-9_-]+$/)) {
                emmitError(target);
                messageWidnow(target, "Login zawiera znaki specjalne");
                return
            }
            break
        }

        case 'email': {
            if(!value.match(EMAIL_REGEX)) {
                emmitError(target);
                messageWidnow(target, "Email jest niepoprawny");
                return
            }
            break
        }
        case 'pass1': 
        case 'pass2': {
            if(!value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/)) {
                emmitError(target);
                messageWidnow(target, "Has??o musi zawiera?? du???? i ma???? liter??, liczbe i znak specjalny");
                return
            }
            if(input_val['pass1'] != input_val['pass2'] && type == 'pass2') {
                emmitError(target);
                messageWidnow(target, "Has??a nie pasuj?? do siebie")
                return
            }
        }
    }
    error_map.set(type, true);
    valueOK(target);
}




const registerAcc = (data:any, flags:Map<string, boolean>, e:Event) => {
    // data = {
    //     login: 'dobrylogin',
    //     email: 'normalny.mail@mail.com',
    //     pass1: 'ABCabc123!@#',
    //     pass2: 'ABCabc123!@#',
    // }
    flags.forEach( flag => {
        if(!flag) {
            messageWidnow(<Element>e.target, "Nie wszystkie pola s?? wype??nione prawid??owo");
            throw new Error('Some input fields are not correct');
        }
    })
    let form = new FormData();
    form.append('data', JSON.stringify(data));
    fetchData('server/registerUser.php', {
        method: 'POST',
        body: form
    }).then( res => {
        messageWidnow(<Element>e.target, res, false);
        
    }).catch (err => {
        messageWidnow(<Element>e.target, err);
        
    })
    
}
//https://www.monterail.com/blog/2016/how-to-build-a-reactive-engine-in-javascript-part-1-observable-objects
//https://stackoverflow.com/questions/35091757/parse-javascript-fetch-in-php
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch?retiredLocale=it