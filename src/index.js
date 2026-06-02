//Y7L3P4JECFHQUZ3526P4V54U8

import './style.css';
import {selectSectionMaker} from "./select-section.js";
import {fetchWeather} from "./fetch-weather.js";

document.addEventListener('DOMContentLoaded', ()=>{
    selectSectionMaker();
    fetchWeather('Kathmandu');
});
