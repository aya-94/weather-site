"use strict";

// Define constants
const APP_ID = '6d15fedd68a149451a4f1650a932fa18';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${APP_ID}`

// Define the DOMs
const location_form = document.getElementById('location-form');
const searchField_input = document.getElementById('search-field');
const searchCity_btn = document.getElementById('search-city');
const getLocation_btn = document.getElementById('get-location');

const tempValue_el = document.getElementById('temp-value');
const location_el = document.getElementById('location');
const tempIcon_el = document.getElementById('temp-icon');

const error_el = document.getElementById('error');
const loading_el = document.getElementById('loading');

// Data
const getImage = (id) => {
    let icon = '';
    if (id < 250) icon = 'thunderstorms.svg';
    else if (id < 350) icon = 'drizzle.svg';
    else if (id < 550) icon = 'rain.svg'
    else if (id < 650) icon = 'snow.svg'
    else if (id < 750) icon = 'haze.svg'
    else if (id === 800) icon = 'clear-day.svg'
    else if (id > 800) icon = 'cloudy.svg'
    return `./assets/icons/${icon}`
}

const fetchData = async (url) => {
    try {
        loading_el.style.display = 'block';
        const response = await fetch(url)
        const data = await response.json()
        const { name, main: { feels_like }, weather } = data;
        const [{ id, main }] = weather;
        loading_el.style.display = 'none';
        return { name, feels_like, id, main }
    } catch (err) {
        loading_el.style.display = 'none';
        if (searchField_input.value) return { error: `Sorry, we couldn't find '${searchField_input.value}'` }
        else return { error: 'Something went wrong' }
    }
}

const renderData = ({ name, feels_like, id, main }) => {
    location_el.textContent = name;
    tempValue_el.textContent = `${Math.round(feels_like - 273)}\u00B0    ${main}`;
    tempIcon_el.src = getImage(id)
    tempIcon_el.style.display = 'block';
}

const resetEverything = () => {
    location_el.textContent = '';
    tempValue_el.textContent = '';
    tempIcon_el.style.display = 'none';
    error_el.textContent = '';
}

// Handlers
const handleSubmit = async (e) => {
    e.preventDefault();
    resetEverything();
    const value = searchField_input.value;

    if (!value) {
        resetEverything();
        return error_el.textContent = 'City field is required';
    }

    const url = `${API_URL}&q=${value}`;
    const data = await fetchData(url);
    if (!data.error) return renderData({ ...data });
    else {
        resetEverything();
        error_el.textContent = data.error
    }
}

const handleGeoClick = () => {
    resetEverything();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { longitude: lon, latitude: lat } = position.coords;
            const url = `${API_URL}&lat=${lat}&lon=${lon}`;
            const data = await fetchData(url);
            return renderData({ ...data });
        });
    } else {
        location_el.textContent = 'We are not allowed to access your location!'
    }
}

// Event listeners
location_form.addEventListener('submit', handleSubmit)
getLocation_btn.addEventListener('click', handleGeoClick);