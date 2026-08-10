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

    currentGrid.dataset.index = 0;

    //Icon Section
    let currentGridIconSection = document.createElement('div');
    currentGridIconSection.classList.add('grid-icon-section');

    let currentGridIcon = document.createElement('img');
    currentGridIcon.classList.add('grid-icon');
    currentGridIconSection.appendChild(currentGridIcon);

    //Content Section
    let currentGridContentSection = document.createElement('div');
    currentGridContentSection.classList.add('grid-content-section');

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
    currentGrid.dataset.condition = conditionToKey(currentWeather.conditions)

    currentGridContentSection.appendChild(currentGridTemp);
    currentGridContentSection.appendChild(currentGridDateSection);
    currentGridContentSection.appendChild(currentGridConditions);
    currentGrid.appendChild(currentGridIconSection);
    currentGrid.appendChild(currentGridContentSection);
    container.appendChild(currentGrid);

    //Style Grid
    weatherStyle(currentGrid, currentGrid.dataset.condition);

    //For the rest of the grids
    for(let i = 1; i < totalDays; i++){
        let dayWeather = weatherData[i];
        let dayGrid = document.createElement('div');
        dayGrid.classList.add('weather-grids');
        dayGrid.classList.add(`grid-${i}`);

        dayGrid.dataset.index = i;

        //Icon section
        let dayGridIconSection = document.createElement('div');
        dayGridIconSection.classList.add('grid-icon-section');

        let dayGridIcon = document.createElement('img');
        dayGridIcon.classList.add('grid-icon');
        dayGridIconSection.appendChild(dayGridIcon);

        //Content Section
        let dayGridContentSection = document.createElement('div');
        dayGridContentSection.classList.add('grid-content-section');

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
        dayGrid.dataset.condition = conditionToKey(dayWeather.conditions)

        dayGridContentSection.appendChild(dayGridTemp);
        dayGridContentSection.appendChild(dayGridDateSection);
        dayGridContentSection.appendChild(dayGridConditions);
        dayGrid.appendChild(dayGridIconSection);
        dayGrid.appendChild(dayGridContentSection);
        container.appendChild(dayGrid);

        //Style Grid
        weatherStyle(dayGrid, dayGrid.dataset.condition);
    }

    let gridTemp = document.querySelectorAll('.grid-temp');
    gridTemp.forEach(temp => {
        temp.addEventListener('click', (e) => {
            e.preventDefault();
            //The element that was clicked
            let element = e.currentTarget;
            let clickedGrid = element.closest(`.weather-grids`); //Find the parent grid
            if(!clickedGrid) return;

            //Extract the number from the 'grid-'
            let gridIndex = Number(clickedGrid.dataset.index);
            console.log(`Grid Index: ${gridIndex}`)
            let passWeather = weatherData[gridIndex];
            let passTemp = passWeather.temp; //Temperature to be passed

            console.log(`Clicked: ${element}`)

            temperatureConverter(element, passTemp);
        })}
    );
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
    let remainder = day % 100;

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
    //First time running, temperature passed is always in Fahrenheit
    let fahrenheit = temp;

    let celsius;
    let resultTemp;

    if (element.classList.contains("f")){ //If element is in Fahrenheit
        //Convert to Celcius
        resultTemp = ((fahrenheit - 32) * (5/9)).toFixed(2);
        console.log(`Result Temp: ${resultTemp}`)
        //Convert .f to .c for next click
        element.classList.remove('f');
        element.classList.add('c');
        element.textContent = `${resultTemp}°C`
        celsius = resultTemp;
    }else if (element.classList.contains("c")){
        //Since F is passed at least once already, just change it back
        element.classList.remove('c');
        element.classList.add('f');
        resultTemp = temp;
        element.textContent = `${resultTemp}°F`
    }else{
        return;
    }
};

//Map condition to key function
function conditionToKey(condition){
    // keys = [
    //             sunny, clear, partly-cloudy, cloudy,
    //             rain, thunderstorm,
    //             snow, fog, unknown
    //             ];

    console.log(`Passed condition: ${condition}`)
    let resultKey;
    
    //Trim to remove whitespaces at the beginning, split at a comma or a whitespace, join with "-"
    let strippedCondition = condition.trim().toLowerCase().split(/[,\s]+/).join('-');

    if (strippedCondition.includes('clear')){
        resultKey = 'clear';
    }else if(strippedCondition.includes('sunny') || strippedCondition.includes('partly-sunny')
            || strippedCondition.includes('partially-sunny')){
        resultKey = 'sunny';
    }else if(strippedCondition.includes('cloudy') || strippedCondition.includes('overcast')){
        resultKey = 'cloudy';
    }else if(strippedCondition.includes('partly-cloudy') || strippedCondition.includes('partially-cloudy')){
        resultKey = 'partly-cloudy';
    }else if(strippedCondition.includes('rain') || strippedCondition.includes('shower')){
        resultKey = 'rain';
    }else if(strippedCondition.includes('drizzle') || strippedCondition.includes('light-rain')
            || strippedCondition.includes('mist')  || strippedCondition.includes('sprinkle')){
        resultKey = 'light-rain';
    }else if(strippedCondition.includes('thunder') || strippedCondition.includes('storm')){
        resultKey = 'thunderstorm';
    }else if(strippedCondition.includes('snow') || strippedCondition.includes('sleet')
            || strippedCondition.includes('hail')){
        resultKey = 'snow';
    }else if(strippedCondition.includes('fog') || strippedCondition.includes('haze')
            || strippedCondition.includes('smoke')){
        resultKey = 'fog';
    }else{
        resultKey = 'unknown'
    }

    return resultKey;
}

//Style the weather grid
async function weatherStyle(grid, condition){
    //Gradients for all weather conditions
    let weatherGradients = {
        'clear': 'linear-gradient(135deg, #FFB74D, #FF8A65)', 
        'sunny': 'linear-gradient(135deg, #FF8A65, #f68d23',       // Warm Sunrise Orange
        'partly-cloudy': 'linear-gradient(135deg, #5c93c4, #87b5db)', // Soft Daylight Blue
        'cloudy': 'linear-gradient(135deg, #758A99, #A3B8CC)',        // Flat Overcast Grey
        'rain': 'linear-gradient(135deg, #527d92, #284557)',
        'light-rain': 'linear-gradient(135deg, #42b1b1, #2d6382',          // Deep Muted Rain Slate
        'thunderstorm': 'linear-gradient(135deg, #1F2833, #392056)',  // Dark Electric Purple/Black
        'snow': 'linear-gradient(135deg, #E0F7FA, #80DEEA)',          // Bright Icy Blue
        'fog': 'linear-gradient(135deg, #A8B4BC, #CFD8DC)',           // Hazy Mist Silver
        'unknown': 'linear-gradient(135deg, #2C3E50, #000000)'        // Solid Dark Neutral
    };

    let weatherIcons = {
        'clear': new URL('./assets/clear.png', import.meta.url).href,
        'sunny': new URL('./assets/sunny.png', import.meta.url).href,
        'partly-cloudy': new URL('./assets/partly-cloudy.png', import.meta.url).href,
        'cloudy': new URL('./assets/cloudy.png', import.meta.url).href,
        'rain': new URL('./assets/rain.png', import.meta.url).href,
        'light-rain': new URL('./assets/light-rain.png', import.meta.url).href,
        'thunderstorm': new URL('./assets/thunderstorm.png', import.meta.url).href,
        'snow': new URL('./assets/snow.png', import.meta.url).href,
        'fog': new URL('./assets/fog.png', import.meta.url).href,
        'unknown': new URL('./assets/unknown.png', import.meta.url).href
    }

    let gridIcon = grid.querySelector('.grid-icon');
    console.log(`Selected gridIcon: ${gridIcon}`)

    grid.style.background = weatherGradients[condition];
    
    gridIcon.src = weatherIcons[condition];
}