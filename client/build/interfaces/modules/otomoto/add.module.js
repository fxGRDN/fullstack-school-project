import { emmitError, messageWidnow, valueOK } from "../../utilis/error.handler.js";
import { getTemplate } from "../../utilis/fetch.handler.js";
import { fetchData } from "../../utilis/response.handler.js";
let carFlag = {
    brand: false,
    model: false,
    plate_num: false,
    year: false
};
let userFlag = {
    name: false,
    surname: false,
    PESEL: false,
    city: false,
    street: false,
    home_num: false
};
let userFormValue = {
    name: "",
    surname: "",
    PESEL: "",
    city: "",
    street: "",
    home_num: ""
};
let carFormValue = {
    brand: "",
    model: "",
    plate_num: "",
    year: "",
    owner_id: ""
};
let clearUserFlag = { ...userFlag };
let clearCarFlag = { ...carFlag };
let clearUserForm = { ...userFormValue };
let clearCarrForm = { ...carFormValue };
export const comp_add = (target) => {
    getTemplate('add_items')
        .then(comp => {
        target.appendChild(comp);
        let CAR_CONT = comp.querySelector('.car-form__container > .form__wrapper');
        let OWNER_CONT = comp.querySelector('.owner-form__container > .form__wrapper');
        fetchData('server/get_Items.php?tb=owners')
            .then((data) => {
            let submit = CAR_CONT.children[CAR_CONT.children.length - 1].firstElementChild;
            data.forEach(user => {
                let option = document.createElement('option');
                option.innerHTML = `${user.name} ${user.surname}`;
                option.value = user.id;
                submit.appendChild(option);
            });
            let option = document.createElement('option');
            option.innerHTML = 'Brak';
            option.value = "";
            option.selected = true;
            submit.appendChild(option);
        })
            .catch(err => console.error(err));
        CAR_CONT.childNodes.forEach(child => child.addEventListener('keyup', (e) => handleInput(e, carFormValue, carFlag, carErrHandler)));
        OWNER_CONT.childNodes.forEach(child => child.addEventListener('keyup', (e) => handleInput(e, userFormValue, userFlag, userErrHandler)));
        comp.querySelector('.send-car').addEventListener('click', (e) => send(e, 'cars', carFormValue, carFlag));
        comp.querySelector('.send-owner').addEventListener('click', (e) => send(e, 'owners', userFormValue, userFlag));
    });
};
const handleInput = (event, form_vals, flags, handler) => {
    let caller = event.target;
    carFormValue[caller.name] = caller.value;
    carFlag[caller.name] = false;
    if (caller.value.length == 0) {
        emmitError(caller);
        messageWidnow(caller, "Pole nie może być puste");
        return;
    }
    if (handler(caller))
        return;
    carFlag[caller.name] = true;
    valueOK(caller);
};
const send = (e, table, data, err_flag) => {
    for (const err in err_flag) {
        if (!err_flag[err]) {
            messageWidnow(e.target, "Nie wszystkie pola są wypełnione prawidłowo");
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
        if (table == 'cars') {
            data = clearCarrForm;
            err_flag = clearCarFlag;
        }
        else {
            data = clearUserForm;
            err_flag = clearUserFlag;
        }
        messageWidnow(e.target, res, false);
    })
        .catch(err => {
        messageWidnow(e.target, err);
    });
};
const carErrHandler = (caller) => {
    switch (caller.name) {
        case 'year': {
            if (parseInt(caller.value) > new Date().getFullYear() || parseInt(caller.value) < 1940) {
                emmitError(caller);
                messageWidnow(caller, "Wpisz poprawny rok");
                return true;
            }
            break;
        }
        case 'plate_num': {
            if (!caller.value.match(/^[A-Z]{2,3}([A-Z]|[0-9]){5}$/)) {
                emmitError(caller);
                messageWidnow(caller, "Napis nie spełnia formatu");
                return true;
            }
        }
    }
    return false;
};
const userErrHandler = (caller) => {
    switch (caller.name) {
        case 'PESEL': {
            if (!caller.value.match(/^[0-9]{11}$/)) {
                emmitError(caller);
                messageWidnow(caller, "Wpisz poprawny PESEL");
                return true;
            }
            break;
        }
        case 'home_num': {
            if (!caller.value.match(/^[0-9]{1,3}(\/[0-9]{1,3})?[a-zA-Z]?$/)) {
                emmitError(caller);
                messageWidnow(caller, "Wpisz poprawny numer domu");
                return true;
            }
            break;
        }
    }
    return false;
};
