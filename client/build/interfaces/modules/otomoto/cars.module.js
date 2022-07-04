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
                update_vals: update_values
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
    comp.querySelector('.owner').innerHTML = data.owner_id ? data.owner_id : "Brak";
    comp.setAttribute('id', data.id);
};
