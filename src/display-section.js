// import { CodeGenerationResults } from "webpack";
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
    currentGridTemp.classList.add('f');
    currentGridTemp.textContent = `${currentWeather.temp}°F`;

    // let currentGridDate = document.createElement('p');
    // currentGridDate.classList.add('grid-date');
    // currentGridDate.textContent += `Today\n`;
    // currentGridDate.textContent += `${dateFormatter(currentWeather.date)}\n`
    // currentGridDate.textContent += `${currentWeather.date}`;
    
    let currentGridDateSection = document.createElement('div');
    currentGridDateSection.classList.add('grid-date-section');
    let currentGridStatus = document.createElement('p');
    currentGridStatus.classList.add('grid-status');
    currentGridStatus.textContent = `Today`;
    let currentGridDay = document.createElement('p');
    currentGridDay.classList.add('grid-day');
    currentGridDay.textContent = `${dateFormatter(currentWeather.date)}`;
    let currentGridDate = document.createElement('p');
    currentGridDate.classList.add('grid-date');
    currentGridDate.textContent = `${ordinalDateFormatter(new Date(currentWeather.date))}`;
    currentGridDateSection.appendChild(currentGridStatus);
    currentGridDateSection.appendChild(currentGridDay);
    currentGridDateSection.appendChild(currentGridDate);

    let currentGridConditions = document.createElement('p');
    currentGridConditions.classList.add('grid-conditions');
    currentGridConditions.textContent = `${currentWeather.conditions}`;

    currentGrid.appendChild(currentGridTemp);
    currentGrid.appendChild(currentGridDateSection);
    currentGrid.appendChild(currentGridConditions);
    container.appendChild(currentGrid);

    for(let i = 1; i < totalDays; i++){
        let dayWeather = weatherData[i];
        let dayGrid = document.createElement('div');
        dayGrid.classList.add('weather-grids');
        dayGrid.classList.add(`grid-${i}`);
        let dayGridTemp = document.createElement('p');
        dayGridTemp.classList.add('grid-temp');
        dayGridTemp.classList.add('f');
        dayGridTemp.textContent = `${dayWeather.temp}°F`;

        let dayGridDateSection = document.createElement('div');
        dayGridDateSection.classList.add('grid-date-section');
        let dayGridDay = document.createElement('p');
        dayGridDay.classList.add('grid-day');
        dayGridDay.textContent = `${dateFormatter(dayWeather.date)}`;
        let dayGridDate = document.createElement('p');
        dayGridDate.classList.add('grid-date');
        dayGridDate.textContent = `${ordinalDateFormatter(new Date(dayWeather.date))}`;
        dayGridDateSection.appendChild(dayGridDay);
        dayGridDateSection.appendChild(dayGridDate);

        let dayGridConditions = document.createElement('p');
        dayGridConditions.classList.add('grid-conditions');
        dayGridConditions.textContent = `${dayWeather.conditions}`;

        dayGrid.appendChild(dayGridTemp);
        dayGrid.appendChild(dayGridDateSection);
        dayGrid.appendChild(dayGridConditions);
        container.appendChild(dayGrid);

        //GRID TEMPERATURE CHANGE
        let gridTemp = document.querySelectorAll('.grid-temp');
        gridTemp.forEach(temp => {
            temp.addEventListener('click', (e) => {
                e.preventDefault();
                //The element that was clicked
                let element = e.currentTarget;
                let currentGrid = element.closest(`[class*="grid-"]`); //Find the parent grid
                if(!currentGrid) return;
                //Create an array of all classes, return the element that includes 'grid-'
                let gridClass = Array.from(currentGrid.classList).find(c => c.startsWith(`grid-`));
                //Extract the number from the 'grid-'
                let gridIndex = parseInt(gridClass.split('-')[1], 10);
                console.log(`Grid Index: ${gridIndex}`)
                let passWeather = weatherData[gridIndex];
                let passTemp = passWeather.temp; //Temperature to be passed

                console.log(`Clicked: ${element}`)

                temperatureConverter(element, passTemp);
            })}
        );
    }
}

//To get the current day associated with the date
function dateFormatter(dateString){
    let apiDate = dateString;
    let dateObj = new Date(apiDate);
    return dateObj.toLocaleDateString('en-US', {weekday: 'long'});
}

//To abbreviate date to "1st Jan" format\
function ordinalDateFormatter(dateString){
    const day = dateString.getDate();

    //Ordinal suffix
    let suffix;
    let remainder;

    //Special cases (11, 12, 13) always get 'th'
    if (remainder >= 11 && remainder <= 13) {
        suffix = 'th';
    } else {
        suffix = ['th', 'st', 'nd', 'rd'][day % 10] || 'th';
    }


    //Abbreviate month name
    let month = dateString.toLocaleString('en-US', {month: 'short'});

    return `${day}${suffix} ${month}`;
}

//Temperature Converter
function temperatureConverter(element, temp){
    let currentTemp = temp;
    let resultTemp;

    if (element.classList.contains("f")){ //If element is in Fahrenheit
        //Convert to Celcius
        resultTemp = ((currentTemp - 32) * (5/9)).toFixed(2);
        console.log(`Result Temp: ${resultTemp}`)
        //Convert .f to .c for next click
        element.classList.remove('f');
        element.classList.add('c');
        element.textContent = `${resultTemp}°C`
    }else if (element.classList.contains("c")){
        resultTemp = ( ( (currentTemp * (5/9)) + 32 ) ).toFixed(2);
        element.classList.remove('c');
        element.classList.add('f');
        element.textContent = `${resultTemp}°F`
    }else{
        return;
    }
};