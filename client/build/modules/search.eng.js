export const comp_search = (target, data, placeholder, render) => {
    const SEARCH_ELE = document.createElement('input');
    target.style.position = 'relative';
    SEARCH_ELE.placeholder = placeholder;
    SEARCH_ELE.classList.add('search_input');
    target.appendChild(SEARCH_ELE);
    data.forEach(car => render(target, car));
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
            data.forEach(car => render(target, car));
            return;
        }
        while (target.lastChild != SEARCH_ELE) {
            target.removeChild(target.lastChild);
        }
        filtered.forEach(car => render(target, car));
        rendered = filtered;
    });
};
