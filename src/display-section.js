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