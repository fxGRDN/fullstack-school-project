//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
import { view_login } from './modules/login.module.js';
export const INPUT_TARGET = document.querySelector('.app');
window.addEventListener('load', () => view_login(INPUT_TARGET));
