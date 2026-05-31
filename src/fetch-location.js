//Y7L3P4JECFHQUZ3526P4V54U8

export async function fetchLocation(location){
    try{
        let request = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=Y7L3P4JECFHQUZ3526P4V54U8`);
        let result = await request.json();
        console.log(result);
    }catch(error){
        console.log(error);
    }
    
}