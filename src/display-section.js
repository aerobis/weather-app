import {getWeather} from "./state.js";
import {getLocation} from "./state.js";

export function displaySectionMaker(){
    let container = document.querySelector(".main-content");

    let displaySection = document.createElement('div');
    displaySection.classList.add('display-section');

    let displaySectionContent = document.createElement('div');
    displaySectionContent.classList.add('display-section-content');

    let locationName = document.createElement('h2');
    locationName.classList.add('location-name');
    locationName.textContent = getLocation();

    console.log(`Location Name Check: ${locationName.textContent}`);

    displaySection.appendChild(locationName);
    displaySection.appendChild(displaySectionContent);
    container.appendChild(displaySection);
}

export function gridMaker(){
    let container = document.querySelector(".display-section-content");

    let weatherData = getWeather();
    console.log(`Weather Data from gridMaker: ${JSON.stringify(weatherData)}`);
    let currentWeather = weatherData[0];
    console.log(`Current Weather from gridMaker: ${JSON.stringify(currentWeather)}`);
    let totalDays = weatherData.length;

    //Structure should go: Temp > Day (Date) > conditions
    let currentGrid = document.createElement('div');
    currentGrid.classList.add('weather-grids');
    currentGrid.classList.add(`grid-0`);
    let currentGridTemp = document.createElement('p');
    currentGridTemp.classList.add('grid-temp');
    currentGridTemp.textContent = `${currentWeather.temp}°C`;
    let currentGridDate = document.createElement('p');
    currentGridDate.classList.add('grid-date');
    currentGridDate.textContent = `${dateFormatter(currentWeather.date)}`;
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
        dayGridTemp.textContent = `${dayWeather.temp}°C`;
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