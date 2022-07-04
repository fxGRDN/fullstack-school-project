export async function getTemplate(module) {
    let data = await (await fetch(`client\\components\\${module}.html`)).text();
    let parser = new DOMParser();
    let componentDoc = parser.parseFromString(data, 'text/html');
    let component = componentDoc.querySelector('.module-wrapper');
    let container = component.firstElementChild;
    return container;
}
