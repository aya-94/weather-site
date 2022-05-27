//weather data 
let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
const searchCity = document.querySelector(".search-city");
const getLocation = document.querySelector(".get-location");
const inputValue = document.querySelector(".input-value");
const APIkey = "6d15fedd68a149451a4f1650a932fa18";
const startUrl = 'https://api.openweathermap.org/data/2.5/weather?'


const getImage = (id) => {
    const imgUrl = "./icons/"
    if (id < 250) {
        return `${imgUrl}thunderstorms.svg`
    } else if (id < 350) {
        return `${imgUrl}drizzle.svg`
    } else if (id < 550) {
        return `${imgUrl}rain.svg`
    } else if (id < 650) {
        return `${imgUrl}snow.svg`
    } else if (id < 750) {
        return `${imgUrl}haze.svg`
    } else if (id === 800) {
        return `${imgUrl}clear-day.svg`
    } else if (id > 800) {
        return `${imgUrl}cloudy.svg`
    }
}

const fetchData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const { name } = data;
            const { feels_like } = data.main;
            const { id, main } = data.weather[0];
            loc.textContent = name;
            climate.textContent = main;
            tempValue.textContent = Math.round(feels_like - 273);
            tempIcon.src = getImage(id)
        })
        .catch(err => console.log('wrong'))
}

searchCity.addEventListener('click', () => {
    const API = `${startUrl}q=${inputValue.value}&appid=${APIkey}`
    fetchData(API)
});

getLocation.addEventListener('click', () => {
    let long;
    let lat;
    // getting location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const API = `${startUrl}lat=${lat}&lon=${long}&appid=${APIkey}`;
            fetchData(API)
        });
    }
});