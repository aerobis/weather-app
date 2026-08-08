export function selectSectionMaker(){
    let container = document.querySelector(".main-content");

    let selectSection = document.createElement('div');
    selectSection.classList.add('select-section');

    let selectSectionContent = document.createElement('div');
    selectSectionContent.classList.add('select-section-content');

    // let label = document.createElement('p');
    // label.classList.add('select-section-text');
    // label.textContent = "Select your location: ";
    // label.setAttribute('for', 'location-input');

    let locationInput = document.createElement('input');
    locationInput.id = 'location-input';
    locationInput.setAttribute('placeholder', 'Insert your location...');

    let submitBtn = document.createElement('button');
    submitBtn.id = 'search-button';
    submitBtn.textContent = "Search";

    // selectSectionContent.appendChild(label);
    selectSectionContent.appendChild(locationInput);
    selectSectionContent.appendChild(submitBtn);
    selectSection.appendChild(selectSectionContent);
    container.appendChild(selectSection);
}