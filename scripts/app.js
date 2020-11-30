const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    //destructure properties
    const { cityDetails, weather } = data;

    //updating template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //Ternary operator   condition        if              else
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
};


const updateCity =  async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    //short hand notation if the names are the same
    return {
        cityDetails,
        weather
    };
};

cityForm.addEventListener('submit', e => {
    //doesnt refresh the page
    e.preventDefault();

    //getting city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //updating the ui with the city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}