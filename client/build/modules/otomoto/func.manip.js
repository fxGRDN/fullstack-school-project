import { fetchData } from "../../utilis/response.handler.js";
import { getTemplate } from "../../utilis/fetch.handler.js";
const delete_item = (comp, data, table) => {
    fetchData(`server/removeData.php?tb=${table}&id=${data.id}`)
        .then(res => {
        console.log(res);
        comp.remove();
    })
        .catch(err => console.error(err));
};
export const comp_search = (target, data, placeholder, renderOpt) => {
    const SEARCH_ELE = document.createElement('input');
    target.style.position = 'relative';
    SEARCH_ELE.placeholder = placeholder;
    SEARCH_ELE.classList.add('search_input');
    target.appendChild(SEARCH_ELE);
    data.forEach(car => item(target, car, renderOpt));
    let rendered = data;
    SEARCH_ELE.addEventListener('input', (e) => {
        let keyword = e.target.value || "";
        let filtered = data.filter((obj) => {
            for (const data in obj) {
                let word = obj[data] ? obj[data].toString() : "Brak";
                if (word.indexOf(keyword) > -1) {
                    return obj;
                }
            }
        });
        if (JSON.stringify(rendered) == JSON.stringify(filtered))
            return;
        if (keyword == "") {
            while (target.lastChild != SEARCH_ELE) {
                target.removeChild(target.lastChild);
            }
            data.forEach(car => item(target, car, renderOpt));
            return;
        }
        while (target.lastChild != SEARCH_ELE) {
            target.removeChild(target.lastChild);
        }
        filtered.forEach(car => item(target, car, renderOpt));
        rendered = filtered;
    });
};
const item = (target, data, options) => {
    getTemplate(options.template).then(comp => {
        target.appendChild(comp);
        options.update_vals(comp, data);
        if (options.editable) {
            comp.querySelector('.edit').addEventListener('click', (e) => options.change_vals(comp, data));
        }
        else {
            comp.querySelector('.edit').remove();
        }
        comp.querySelector('.delete').addEventListener('click', (e) => delete_item(comp, data, options.table));
        const IMAGE = comp.querySelector('.image__container');
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/300.webp/ffffff/000000?text=kocham+php`;
        IMAGE.appendChild(img);
    });
};
