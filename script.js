// Replace with your own API key from OpenWeatherMap
const API_KEY = 'YOUR_API_KEY';

document.addEventListener('DOMContentLoaded', () => {
    const fetchWeatherBtn = document.getElementById('fetch-weather');
    const locationInput = document.getElementById('location');
    const weatherInfoDiv = document.getElementById('weather-info');

    // Event listener for the button
    fetchWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        } else {
            getUserLocation();
        }
    });

    // Fetch weather data using location name
    function fetchWeatherData(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Use Geolocation API to get user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            }, error => {
                alert('Unable to retrieve your location.');
                console.error('Error getting location:', error);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    // Fetch weather data using latitude and longitude
    function fetchWeatherByCoords(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Display the weather data on the page
    function displayWeatherData(data) {
        if (data.cod === 200) {
            weatherInfoDiv.innerHTML = `
                <div><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
                <div><strong>Temperature:</strong> ${data.main.temp} °C</div>
                <div><strong>Weather:</strong> ${data.weather[0].description}</div>
                <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
                <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
            `;
        } else {
            weatherInfoDiv.innerHTML = `<div>Error: ${data.message}</div>`;
        }
    }
});
