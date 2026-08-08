let weatherState = {
    data: null
};

export function setWeather(data){
    weatherState.data = data;
}

export function getWeather(){
    return weatherState.data;
}

export function getLocation(){
    return weatherState.data.location;
}