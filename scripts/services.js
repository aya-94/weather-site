import { loading_el, searchField_input, location_el, tempValue_el, tempIcon_el, error_el } from "./elements.js";


export const getImage = (id) => {
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

export const fetchData = async (url) => {
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

export const renderData = ({ name, feels_like, id, main }) => {
    location_el.textContent = name;
    tempValue_el.textContent = `${Math.round(feels_like - 273)}\u00B0    ${main}`;
    tempIcon_el.src = getImage(id)
    tempIcon_el.style.display = 'block';
}

export const resetEverything = () => {
    location_el.textContent = '';
    tempValue_el.textContent = '';
    tempIcon_el.style.display = 'none';
    error_el.textContent = '';
}