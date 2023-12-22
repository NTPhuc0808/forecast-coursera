function getWeeklyWeather() {
    const apiKey = '0fbf348ff05bae2b598cecb1b259ba78';
    const citySelect = document.getElementById('city');
    const countryInput = document.getElementById('country');
    const weatherInfoDiv = document.getElementById('weather-info');

    const city = citySelect.value;
    const country = countryInput.value;

    // Check if the user has selected a city
    if (!city) {
        weatherInfoDiv.innerHTML = `<p>Please select a city.</p>`;
        return;
    }

    // Use the forecast endpoint for weekly forecast
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=metric`; // Units in Celsius

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayWeeklyWeatherInfo(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
        });
}

function displayWeeklyWeatherInfo(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const forecasts = data.list;

    // Display forecast information for each day
    let weatherHTML = '<h2>Weekly Weather Forecast</h2>';
    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert timestamp to date
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = forecast.main.temp.toFixed(2); // Keep it in Celsius
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon; // Add icon for weather condition

        weatherHTML += `
            <p>${day}: ${temperature}°C, ${description} <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${description}"></p>
        `;
    });

    weatherInfoDiv.innerHTML = weatherHTML;
}
