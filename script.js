const apiKey = "ebf6652c096ba34bf4998ac534a1784a";

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        // Update weather display
        document.querySelector(".city").innerText = `Weather in ${data.name}`;
        document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".description").innerText = data.weather[0].description;
        document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${data.wind.speed} km/h`;

        // Update weather icon
        const weatherIcon = document.querySelector(".icon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

function getWeather() {
    const city = document.querySelector(".search-bar").value;
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a city name');
    }
}

// Event listener for search button
const searchButton = document.querySelector(".search button");
searchButton.addEventListener("click", getWeather);

// Event listener for Enter key press
const searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
