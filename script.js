"use strict";

const tempValueEl = document.getElementById('temp-value');
const locationEl = document.getElementById('location');
const tempIcon = document.getElementById('temp-icon');
const searchCity = document.querySelector('.search-city');
const getLocation = document.querySelector('.get-location');
const inputValue = document.querySelector('.input-value');
const API_KEY = '6d15fedd68a149451a4f1650a932fa18';
const START_URL = 'https://api.openweathermap.org/data/2.5/weather?'


const getImage = (id) => {
    const IMG_URL = "./assets/icons/"
    if (id < 250) {
        return `${IMG_URL}thunderstorms.svg`
    } else if (id < 350) {
        return `${IMG_URL}drizzle.svg`
    } else if (id < 550) {
        return `${IMG_URL}rain.svg`
    } else if (id < 650) {
        return `${IMG_URL}snow.svg`
    } else if (id < 750) {
        return `${IMG_URL}haze.svg`
    } else if (id === 800) {
        return `${IMG_URL}clear-day.svg`
    } else if (id > 800) {
        return `${IMG_URL}cloudy.svg`
    }
}

const fetchData = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const { name } = data;
            const { feels_like } = data.main;
            const { id, main } = data.weather[0];
            locationEl.textContent = name;
            tempValueEl.textContent = `${Math.round(feels_like - 273)}\u00B0    ${main}`;
            tempIcon.src = getImage(id)
            tempIcon.style.display = 'block';
        })
        .catch((err) => {
            const value = inputValue.value
            locationEl.textContent = `Sorry, we couldn't find '${value}'`
            tempValueEl.textContent = ''
            tempIcon.style.display = 'none';
        })
        .finally(() => {
            inputValue.value = ''
        })
}

const gettingInputData = () => {
    const API = `${START_URL}q=${inputValue.value}&appid=${API_KEY}`
    fetchData(API)
}

searchCity.addEventListener('click', () => {
    gettingInputData()
});

inputValue.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        gettingInputData()
    }
});

getLocation.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            const API = `${START_URL}lat=${lat}&lon=${long}&appid=${API_KEY}`;
            fetchData(API)
        });
    }
});