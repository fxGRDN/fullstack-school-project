import { getTemplate } from "../../utilis/fetch.handler.js";
import { fetchData } from "../../utilis/response.handler.js";
import { comp_search } from "./func.manip.js";
export const comp_cars = (target) => {
    getTemplate('show_items').then(comp => {
        target.appendChild(comp);
        fetchData('server/get_Items.php?tb=cars')
            .then(res => {
            comp_search(comp, res, "Model, marka, rok itp...", {
                template: "item_car",
                img_text: "AUTO",
                table: 'cars',
                update_vals: update_values,
                change_vals: updateCarOwner,
                editable: true
            });
        })
            .catch(err => console.log(err));
    });
};
const update_values = (comp, data) => {
    comp.querySelector('.brand').innerHTML = data.brand;
    comp.querySelector('.model').innerHTML = data.model;
    comp.querySelector('.year').innerHTML = data.year;
    comp.querySelector('.plate').innerHTML = data.plate_num;
    if (data.owner_id) {
        fetchData(`server/get_Items.php?tb=owners&id=${data.owner_id}`)
            .then((uData) => {
            comp.querySelector('.owner').innerHTML = `${uData[0].name} ${uData[0].surname}`;
        });
    }
    comp.setAttribute('id', data.id);
};
const updateCarOwner = (comp, cData) => {
    let button = document.createElement('button');
    button.innerHTML = 'zapisz';
    let submit = document.createElement('select');
    comp.querySelector('.owner').replaceChildren(button, submit);
    let oldId = cData.owner_id;
    let option = document.createElement('option');
    option.innerHTML = 'Brak';
    option.value = "";
    option.selected = true;
    submit.appendChild(option);
    fetchData('server/get_Items.php?tb=owners')
        .then((data) => {
        let newOwner;
        data.forEach(user => {
            let option = document.createElement('option');
            option.innerHTML = `${user.name} ${user.surname}`;
            option.value = user.id;
            submit.appendChild(option);
        });
        submit.addEventListener('change', (e) => {
            let caller = e.target;
            newOwner = data.findIndex((element) => {
                if (element.id == caller.value)
                    return true;
                return false;
            });
        });
        button.addEventListener('click', () => {
            fetchData(`server/update_Items.php?tb=cars&id=${data[newOwner].id}&plates=${cData.plate_num}`)
                .then(res => {
                console.log(res);
                comp.querySelector('.owner').replaceChildren();
                comp.querySelector('.owner').innerHTML = `${data[newOwner].name} ${data[newOwner].surname}`;
            })
                .catch(err => console.log(err));
        });
    })
        .catch(err => console.error(err));
};
