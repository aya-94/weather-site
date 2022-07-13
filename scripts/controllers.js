import { API_URL } from "./config.js";
import { searchField_input, location_el, error_el } from "./elements.js";
import { fetchData, renderData, resetEverything } from "./services.js";

export const handleSubmit = async (e) => {
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

export const handleGeoClick = () => {
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