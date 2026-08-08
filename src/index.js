//Y7L3P4JECFHQUZ3526P4V54U8

import './style.css';
import {selectSectionMaker} from "./select-section.js";
import {fetchWeather} from "./fetch-weather.js";

document.addEventListener('DOMContentLoaded', ()=>{
    selectSectionMaker();
    let searchBtn = document.getElementById('search-button');
    let locationInput = document.getElementById('location-input');

    searchBtn.addEventListener('click', async ()=>{
        let location = locationInput.value;
        let weatherData = await fetchWeather(location);
        console.log(weatherData);
    });

});
