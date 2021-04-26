let cityForm = document.getElementById("cityForm");
let card = document.querySelector(".card");
let details = document.querySelector(".details");
let time = document.querySelector("img.time");
let icon = document.querySelector(".icon img");
let timeZone = document.getElementById("timeZone");


let updateUI = (data) => {
    console.log(data);

    const { cityDetails, weather, futureForecast} = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName} - ${cityDetails.Country.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-3">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;</span>
        </div>
    `;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;

    if(weather.IsDayTime) {
        //timeSrc = '../img/day.jpg';
        timeSrc = '../img/day 2.jpg';
        //timeSrc = '../img/day 3.jpg';
    } else {
        //timeSrc = '../img/night.jpg';
        timeSrc = '../img/night 2.jpg';
        //timeSrc = '../img/night 3.jpg';
    }

    time.setAttribute('src', timeSrc);


    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let row = '';

    row += `<div class="col-1"></div>`;
    for (let i = 0; i < futureForecast.DailyForecasts.length; i++) {
        row += `
        <div class="col-2"><img src="img/icons/${futureForecast.DailyForecasts[i].Day.Icon}.svg" alt="">${days[new Date(futureForecast.DailyForecasts[i].Date).getDay()]}</div>
        `;
    }
    row += `<div class="col-1"></div>`;
    timeZone.innerHTML = row;
    

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}

let updateCity = async (city) => {

    let cityDetails = await getCity(city);
    let weather = await getWeather(cityDetails.Key);
    let futureForecast = await getFutureForecast(cityDetails.Key);

    return {
        cityDetails,
        weather,
        futureForecast
    };
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    let city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

})