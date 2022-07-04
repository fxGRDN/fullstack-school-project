export const messageWidnow = (target:Element, message:string, error=true) => {
    const mess = document.createElement('div');
    mess.style.top = `${target.getBoundingClientRect().bottom+5}px`
    mess.classList.add('error-message');
    mess.innerHTML = message;


    if(!error) mess.style.color = "green";

    if(target.nextElementSibling?.classList.contains('error-message')) return;
    target.insertAdjacentElement('afterend', mess);
    setTimeout( () => mess.remove(), 3000);
} 


export const emmitError = (target: HTMLInputElement) => {
    target.style.outline = '1px solid red';
    target.style.backgroundColor = "";
    
}



export const valueOK = (target:HTMLInputElement) => {
    target.style.outline = "";
    target.style.backgroundColor = '#90EE90';
}