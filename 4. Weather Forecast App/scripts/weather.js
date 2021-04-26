let key = "AbRUmTQeQ2Mk8np9dZ3HKF5dGq2V0w9t";

let getWeather = async (id) => {
    let base = "http://dataservice.accuweather.com/currentconditions/v1/";
    let query = `${id}?apikey=${key}`;

    let response = await fetch(base + query);
    let data = await response.json();
    return data[0];

}

let getCity = async (city) => {
    let base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    let query = `?apikey=${key}&q=${city}`;
    let response = await fetch(base + query);

    let data = await response.json();
    return data[0];
}


let getFutureForecast = async (locationKey) => {
    let base = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;
    let query = `?apikey=${key}`;
    let response = await fetch(base + query);

    let data = await response.json();
    return data;
}

