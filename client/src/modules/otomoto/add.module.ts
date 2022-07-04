import { emmitError, messageWidnow, valueOK } from "../../utilis/error.handler.js";
import { getTemplate } from "../../utilis/fetch.handler.js";
import { fetchData } from "../../utilis/response.handler.js";
import { CarData, UserData } from "./func.manip.js";

let carFlag: CarData<boolean> = {
    brand: false,
    model: false,
    plate_num: false,
    year: false
}


let userFlag: UserData<boolean> = {
    name: false,
    surname: false,
    PESEL: false,
    city: false,
    street: false,
    home_num: false
}

let userFormValue: UserData<string> = {
    name: "",
    surname: "",
    PESEL: "",
    city: "",
    street: "",
    home_num: ""
}

let carFormValue: CarData<string> = {
    brand: "",
    model: "",
    plate_num: "",
    year: "",
    owner_id: ""
}

let clearUserFlag: UserData<boolean> = {...userFlag};
let clearCarFlag: CarData<boolean> = {...carFlag};
let clearUserForm: UserData<string> = {...userFormValue};
let clearCarrForm: CarData<string> = {...carFormValue};


export const comp_add = (target: Element) => {
    getTemplate('add_items')
        .then(comp => {
            target.appendChild(comp);

            const renderOptions = () => {
                submit.replaceChildren();

                let option: HTMLOptionElement = document.createElement('option');
                option.innerHTML = 'Brak';
                option.value = "";
                option.selected = true;
                submit.appendChild(option);

                fetchData('server/get_Items.php?tb=owners')
                .then((data: UserData<string>[]) => {
                    
                    data.forEach(user => {
                        let option: HTMLOptionElement = document.createElement('option');
                        option.innerHTML = `${user.name} ${user.surname}`;
                        option.value = user.id!;
                        submit.appendChild(option);
                    })
                    
                    submit.addEventListener('change', (e) => {
                        let caller: HTMLInputElement = <HTMLInputElement>e.target!;
                        carFormValue.owner_id = caller.value;
                    });

                })
                .catch(err => console.error(err));
            }

            let CAR_CONT = comp.querySelector('.car-form__container > .form__wrapper')!;
            let OWNER_CONT = comp.querySelector('.owner-form__container > .form__wrapper')!;

            let submit = CAR_CONT.children[CAR_CONT.children.length - 1].firstElementChild!;

            renderOptions();

            submit.addEventListener( 'focus', (e) => renderOptions());
                
            CAR_CONT.childNodes.forEach(child => child.addEventListener('blur', (e) => handleInput(e, carFormValue, carFlag, carErrHandler)));
            OWNER_CONT.childNodes.forEach(child => child.addEventListener('blur', (e) => handleInput(e, userFormValue, userFlag, userErrHandler)));

            comp.querySelector('.send-car')!.addEventListener('click', (e) => send(e, 'cars', carFormValue, carFlag));
            comp.querySelector('.send-owner')!.addEventListener('click', (e) => send(e, 'owners', userFormValue, userFlag));


            




        })
}





const handleInput = (event: Event, form_vals: CarData<string> | UserData<string>, flags: CarData<boolean> | UserData<boolean>, handler: CallableFunction) => {
    let caller: HTMLInputElement = <HTMLInputElement>event.target!;

    form_vals[(<keyof (CarData<string> | UserData<string>)>caller.name)] = caller.value;
    flags[(<keyof (CarData<boolean> | UserData<boolean>)>caller.name)] = false;

    if (caller.value.length == 0) {
        emmitError(caller);
        messageWidnow(caller, "Pole nie może być puste");
        return
    }
    if (handler(caller)) return;

    flags[(<keyof (CarData<boolean> | UserData<boolean>)>caller.name)] = true;
    valueOK(caller);
}




const send = (e: Event, table: string, data: CarData<string> | UserData<string>, err_flag: CarData<boolean> | UserData<boolean>) => {
    console.log(err_flag);
    for (const err in err_flag) {
        if (!err_flag[(<keyof (CarData<boolean> | UserData<boolean>)>err)]) {
            
            
            messageWidnow(<Element>e.target, "Nie wszystkie pola są wypełnione prawidłowo");
            throw new Error('Some input fields are not correct');
        }
    }

    let form = new FormData();
    form.append('data', JSON.stringify(data));
    form.append('table', JSON.stringify(table));
    fetchData('server/add_items.php', {
        method: 'POST',
        body: form
    })
        .then(res => {
            if(table == 'cars') {
                data = clearCarrForm;
                err_flag = clearCarFlag;
            } else {
                data = clearUserForm;
                err_flag = clearUserFlag;
            }
            messageWidnow(<Element>e.target, res, false);

        })
        .catch(err => {
            messageWidnow(<Element>e.target, err);

        })

}



const carErrHandler = (caller: HTMLInputElement) => {
    switch (caller.name) {

        case 'year': {
            if (parseInt(caller.value) > new Date().getFullYear() || parseInt(caller.value) < 1940) {
                emmitError(caller);
                messageWidnow(caller, "Wpisz poprawny rok");
                return true
            }
            break;
        }
        case 'plate_num': {
            if (!caller.value.match(/^[A-Z]{2,3}([A-Z]|[0-9]){5}$/)) {
                emmitError(caller);
                messageWidnow(caller, "Napis nie spełnia formatu");
                return true

            }
            break;
        }
        case 'brand': {
            {
                if(!caller.value.match(/^[a-zA-Z]+$/)){
                    emmitError(caller);
                    messageWidnow(caller, "To pole może zawierać tylko litery");
                    return true
                }
                break;
            }
        }

    }

    return false
}

const userErrHandler = (caller: HTMLInputElement) => {
    switch(caller.name){
        case 'PESEL' : {
            if(!caller.value.match(/^[0-9]{11}$/)){
                emmitError(caller);
                messageWidnow(caller, "Wpisz poprawny PESEL");
                return true
            }
            break;
        }
        
        case 'home_num': {
            if(!caller.value.match(/^[0-9]{1,3}(\/[0-9]{1,3})?[a-zA-Z]?$/)){
                emmitError(caller);
                messageWidnow(caller, "Wpisz poprawny numer domu");
                return true
            }
            break;
        }
        case 'name':
        case 'surname':
        case 'city':
        case 'street': {
            if(!caller.value.match(/[\p{L}-]+/ug)){
                emmitError(caller);
                messageWidnow(caller, "To pole może zawierać tylko litery");
                return true
            }
            break;
        }
        }
        

    

    return false
}

