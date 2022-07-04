import { getTemplate } from "../utilis/fetch.handler.js";
import { getSession, destroySession, setSession } from "../utilis/cookies.handler.js";
import { view_login } from "./login.module.js";
import { UserDetailData} from "../interfaces/login.interface.js";
import { fetchData } from "../utilis/response.handler.js";
import { comp_cars } from "./otomoto/cars.module.js";
import { comp_owners } from "./otomoto/owners.module.js";
import { comp_add } from "./otomoto/add.module.js";

const DEFAULT_DATA: UserDetailData = {
    name: '',
    surname: '',
    date: {
        year: new Date().getFullYear().toString(),
        month: '1',
        day: '1'
    }
};


export const view_home = (target: Element) => {
    getTemplate('home.page').then( view => {
        target.appendChild(view);

        const   SETTINGS_COMP = view.querySelector('.user')!,
                LOGOUT = view.querySelector('.logout')!,
                DISPLAY = view.querySelector('.display__container')!,
                CARS = view.querySelector('.cars')!,
                OWNERS = view.querySelector('.owners')!,
                ADD = view.querySelector('.add')!;

        CARS.addEventListener('click', () => {
            DISPLAY.replaceChildren();
            comp_cars(DISPLAY)
        });
            
        OWNERS.addEventListener('click', () => {
            DISPLAY.replaceChildren();
            comp_owners(DISPLAY);
        });

        ADD.addEventListener('click',  () => {
            DISPLAY.replaceChildren();
            comp_add(DISPLAY)
        })

        const   USERNAME = SETTINGS_COMP.querySelector('.username')!;

        USERNAME.innerHTML = getSession('user').login;


        LOGOUT.addEventListener('click', () => {
            destroySession('user');
            view_login(target);
            view.remove();
        })

        SETTINGS_COMP.addEventListener('click', () => comp_settings(DISPLAY))
        
    })}





const comp_settings = (target: Element) => {
    getTemplate('settings').then( component => {
        target.replaceChildren();
        target.appendChild(component);
        
        const   INPUT_NAME: HTMLInputElement = component.querySelector('#imie')!,
                INPUT_SURNAME: HTMLInputElement = component.querySelector('#nazwisko')!,
                SELECT_YEAR: HTMLSelectElement   = component.querySelector('#year')!,
                SELECT_MONTH: HTMLSelectElement  = component.querySelector('#month')!,
                SELECT_DAY: HTMLSelectElement  = component.querySelector('#day')!,
                SUBMIT = component.querySelector('.submit')!;
            
        const inputArray: [HTMLInputElement, HTMLInputElement, HTMLSelectElement, HTMLSelectElement, HTMLSelectElement] 
                        = [INPUT_NAME, INPUT_SURNAME, SELECT_YEAR, SELECT_MONTH, SELECT_DAY];

        
        SUBMIT.addEventListener('click', () => sendData(getUserData(...inputArray)));

        fetchData(`server/checkUserDetail.php?id=${getSession('user').id}`)
        .then(val => setUserData(val, ...inputArray))
        .catch(reject => setUserData(DEFAULT_DATA, ...inputArray));

        optionFactory(1900, new Date().getFullYear(), SELECT_YEAR);
        optionFactory(1, 12, SELECT_MONTH);
        optionFactory(1, 31, SELECT_DAY);
        
    })
}



const optionFactory = (first:number, last:number, target: Element ) => {
    for(let i = first; i<=last; i++){
        let option: HTMLOptionElement = document.createElement('option');
        option.innerHTML = i.toString();
        option.value = i.toString();
        target.appendChild(option);
    }
    
}

const setUserData = (user_data: UserDetailData, iName: HTMLInputElement, iSurname: HTMLInputElement, sYear: HTMLSelectElement, sMonth: HTMLSelectElement, sDay: HTMLSelectElement) => {
    iName.value = user_data.name;
    iSurname.value = user_data.surname;
    sYear.value = user_data.date.year;
    sMonth.value = user_data.date.month;
    sDay.value = user_data.date.day;
    setSession('USER_DETAIL', user_data);
}

const getUserData = (iName: HTMLInputElement, iSurname: HTMLInputElement, sYear: HTMLSelectElement, sMonth: HTMLSelectElement, sDay: HTMLSelectElement): UserDetailData => {
    return {
        name: iName.value,
        surname: iSurname.value,
        date: {
            year: sYear.value,
            month: sMonth.value,
            day: sDay.value
        }
    }
}

const sendData = (data: UserDetailData) => {
    if([DEFAULT_DATA, getSession('USER_DETAIL')].includes(data) ) {
        throw new Error('Cant send same data');
    }
    
    let form: FormData = new FormData();
    form.append('UserDetailData', JSON.stringify(data));
    form.append('id', getSession('user').id)
    fetch('server/insertUserDetail.php', {
        method: 'POST',
        body: form
    })
}




//responseHandler(`server/userData.php?id=${login_data.id}`);

