export function displaySectionMaker(location){
    let container = document.querySelector(".main-content");

    let displaySection = document.createElement('div');
    displaySection.classList.add('display-section');

    let displaySectionContent = document.createElement('div');
    displaySectionContent.classList.add('display-section-content');

    let locationName = document.createElement('h2');
    locationName.classList.add('location-name');
    locationName.textContent = location;

    displaySection.appendChild(locationName);
    displaySection.appendChild(displaySectionContent);
    container.appendChild(displaySection);
}