import {getDeptName, capitalize} from './utils.js';
window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    const DIVIPOLA_CODE = params.get('code');
    if(getDeptName(DIVIPOLA_CODE)=="") {
        window.location= "/"
    } else {
        document.title +=  " - " + capitalize(getDeptName(DIVIPOLA_CODE).toLowerCase())
    }
}
