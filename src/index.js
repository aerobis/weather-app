//Y7L3P4JECFHQUZ3526P4V54U8

import './style.css';
import {selectSectionMaker} from "./select-section.js";
import {fetchLocation} from "./fetch-location.js";

document.addEventListener('DOMContentLoaded', ()=>{
    selectSectionMaker();
    fetchLocation('Kathmandu');
});
