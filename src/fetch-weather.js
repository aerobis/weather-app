//Y7L3P4JECFHQUZ3526P4V54U8

export async function fetchWeather(location){
    try{
        const request = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=Y7L3P4JECFHQUZ3526P4V54U8`);
        const result = await request.json();
		const days = result.days.slice(0,7);
        let processedData = {};

        const forecast = days.map(day => {
            return {
                date: day.datetime,
                temp: day.temp,
                conditions: day.conditions
            };
        });

		return{
            forecast: forecast
        }
	
        console.log(forecast);
    }catch(error){
        console.log(error);
    }
    
}