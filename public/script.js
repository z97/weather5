async function fetchWeather() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = '';
  
    try {
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      displayWeatherData(data);
    } catch (error) {
      weatherDataDiv.innerHTML = `<p>${error.message}</p>`;
    }
  }
  
  function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    const list = data.list.map(forecast => {
      const date = new Date(forecast.dt_txt).toLocaleString();
      const description = forecast.weather[0].description;
      const temp = Math.round(forecast.main.temp - 273.15); // Convert Kelvin to Celsius
      return `<li>${date}: ${description}, Temp: ${temp}°C</li>`;
    }).join('');
    weatherDataDiv.innerHTML = `<h3>Weather Forecast</h3><ul>${list}</ul>`;
  }
  