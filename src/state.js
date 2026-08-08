let weatherState = {
    location: '',
    data: null
}

export function setWeather(data){
    weatherState.data = data;
    weatherState.location = data[0].location;
    console.log(`Weather Data Set: ${JSON.stringify(weatherState.data)}`);
    console.log(`Location Set: ${weatherState.location}`);
}

export function getWeather(){
    return weatherState.data;
}

export function getLocation(){
    return weatherState.location;
    console.log(`Location Recieve Function Check: ${weatherState.location}`);
}
