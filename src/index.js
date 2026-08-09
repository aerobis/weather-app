//Y7L3P4JECFHQUZ3526P4V54U8

import './style.css';
import {selectSectionMaker} from "./select-section.js";
import {fetchWeather} from "./fetch-weather.js";
import {displaySectionMaker} from "./display-section.js";
import {gridMaker} from "./display-section.js";

document.addEventListener('DOMContentLoaded', ()=>{
    selectSectionMaker();
    let searchBtn = document.getElementById('search-button');
    let locationInput = document.getElementById('location-input');

    searchBtn.addEventListener('click', async ()=>{
        let location = locationInput.value;
        if(location == null || location == undefined || location == ''){
            return;
        }
        await fetchWeather(location);
        displaySectionMaker();
        gridMaker();
    });
});
