import {getWeather} from "./state.js";
import {getLocation} from "./state.js";

export function displaySectionMaker(){
    let container = document.querySelector(".main-content");

    let displaySection = document.createElement('div');
    displaySection.classList.add('display-section');

    let displaySectionContent = document.createElement('div');
    displaySectionContent.classList.add('display-section-content');

    //AVOID DUPLICATION BY CHECKING IF A LOCATION NAME HAS ALREADY BEEN CREATED
    if(!document.querySelector('.location-name')){
        let locationName = document.createElement('h2');
        locationName.classList.add('location-name');
        locationName.textContent = getLocation();
        displaySection.appendChild(locationName);
    }

    // console.log(`Location Name Check: ${locationName.textContent}`);

    displaySection.appendChild(displaySectionContent);
    container.appendChild(displaySection);
}

export function gridMaker(){
    let container = document.querySelector(".display-section-content");

    //GET WEATHER AS AN ARRAY SO IT'S EASIER TO LOOP THROUGH AND CREATE GRIDS FOR EACH DAY
    let weatherData = getWeather();
    console.log(`Weather Data from gridMaker: ${JSON.stringify(weatherData)}`);
    let currentWeather = weatherData[0];
    console.log(`Current Weather from gridMaker: ${JSON.stringify(currentWeather)}`);
    let totalDays = weatherData.length;

    //Structure should go: Temp > Day (Date) > conditions
    //CURRENT GRID IS DIFFERENT THAN THE OTHER GRIDS, SO IT'S OUTSIDE THE LOOP
    let currentGrid = document.createElement('div');
    currentGrid.classList.add('weather-grids');
    currentGrid.classList.add(`grid-0`);
    let currentGridTemp = document.createElement('p');
    currentGridTemp.classList.add('grid-temp');
    currentGridTemp.textContent = `${currentWeather.temp}°FF`;
    let currentGridDate = document.createElement('p');
    currentGridDate.classList.add('grid-date');
    currentGridDate.textContent += `Today\n`;
    // currentGridDate.textContent += `${dateFormatter(currentWeather.date)}\n`
    // currentGridDate.textContent += `${currentWeather.date}`;
    let currentGridConditions = document.createElement('p');
    currentGridConditions.classList.add('grid-conditions');
    currentGridConditions.textContent = `${currentWeather.conditions}`;

    currentGrid.appendChild(currentGridTemp);
    currentGrid.appendChild(currentGridDate);
    currentGrid.appendChild(currentGridConditions);
    container.appendChild(currentGrid);

    for(let i = 1; i < totalDays; i++){
        let dayWeather = weatherData[i];
        let dayGrid = document.createElement('div');
        dayGrid.classList.add('weather-grids');
        dayGrid.classList.add(`grid-${i}`);
        let dayGridTemp = document.createElement('p');
        dayGridTemp.classList.add('grid-temp');
        dayGridTemp.textContent = `${dayWeather.temp}°F`;
        let dayGridDate = document.createElement('p');
        dayGridDate.classList.add('grid-date');
        dayGridDate.textContent = `${dateFormatter(dayWeather.date)}`;
        let dayGridConditions = document.createElement('p');
        dayGridConditions.classList.add('grid-conditions');
        dayGridConditions.textContent = `${dayWeather.conditions}`;

        dayGrid.appendChild(dayGridTemp);
        dayGrid.appendChild(dayGridDate);
        dayGrid.appendChild(dayGridConditions);
        container.appendChild(dayGrid);
    }
}

function dateFormatter(dateString){
    let apiDate = dateString;
    let dateObj = new Date(apiDate);
    return dateObj.toLocaleDateString('en-US', {weekday: 'long'});
}