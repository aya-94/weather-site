'use strict';

const APP_ID = '6d15fedd68a149451a4f1650a932fa18';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const tempValueEl = document.getElementById('temp-value');
const locationEl = document.getElementById('location');
const tempIcon = document.getElementById('temp-icon');
const searchCity = document.querySelector('.search-city');
const getLocation = document.querySelector('.get-location');
const inputValue = document.querySelector('.input-value');

const getImage = (id) => {
	let icon = '';
	if (id < 250) icon = 'thunderstorms.svg';
	else if (id < 350) icon = 'drizzle.svg';
	else if (id < 550) icon = 'rain.svg';
	else if (id < 650) icon = 'snow.svg';
	else if (id < 750) icon = 'haze.svg';
	else if (id === 800) icon = 'clear-day.svg';
	else if (id > 800) icon = 'cloudy.svg';
	return `./assets/icons/${icon}`;
};

const fetchData = async (url) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const { name } = data;
			const { feels_like } = data.main;
			const { id, main } = data.weather[0];
			locationEl.textContent = name;
			tempValueEl.textContent = `${Math.round(
				feels_like - 273
			)}\u00B0    ${main}`;
			tempIcon.src = getImage(id);
			tempIcon.style.display = 'block';
		})
		.catch((err) => {
			const value = inputValue.value;
			locationEl.textContent = `Sorry, we couldn't find '${value}'`;
			tempValueEl.textContent = '';
			tempIcon.style.display = 'none';
		})
		.finally(() => {
			inputValue.value = '';
		});
};

const gettingInputData = () => {
	const API = `${API_URL}q=${inputValue.value}&appid=${APP_ID}`;
	fetchData(API);
};

searchCity.addEventListener('click', () => {
	gettingInputData();
});

inputValue.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		gettingInputData();
	}
});

getLocation.addEventListener('click', () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			const API = `${API_URL}lat=${lat}&lon=${long}&appid=${APP_ID}`;
			fetchData(API);
		});
	}
});
