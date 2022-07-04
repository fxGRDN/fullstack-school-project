import { getTemplate } from "../../utilis/fetch.handler.js";
import { fetchData } from "../../utilis/response.handler.js";
import { comp_search } from "./func.manip.js";
export const comp_owners = (target) => {
    getTemplate('show_items').then(comp => {
        target.appendChild(comp);
        fetchData('server/get_Items.php?tb=owners')
            .then(res => {
            comp_search(comp, res, "Imie, nazwisko, miasto itp", {
                template: "item_owner",
                img_text: "KIEROWCA",
                table: 'owners',
                update_vals: update_values,
                change_vals: () => { },
                editable: false
            });
        })
            .catch(err => console.log(err));
    });
};
const update_values = (comp, data) => {
    comp.querySelector('.name').innerHTML = data.name;
    comp.querySelector('.surname').innerHTML = data.surname;
    comp.querySelector('.city').innerHTML = data.city;
    comp.setAttribute('id', data.id);
};
