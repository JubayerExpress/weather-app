window.onload = function() {
  getWeather();
};

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather, handleError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function handleError(error) {
  alert(`Geolocation Error: ${error.message}`);
}

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 974f95c4d7381d4583057f7713da2664 ; // Replace with your actual OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert(`Fetch Error: ${error.message}`);
      console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
  if (!data || data.cod !== 200) {
    alert('Invalid weather data received');
    return;
  }

  const location = data.name || 'Unknown Location';
  const temperature = data.main.temp || '--';
  const description = data.weather[0].description || '--';
  const feelsLike = data.main.feels_like || '--';
  const humidity = data.main.humidity || '--';
  const windSpeed = data.wind.speed || '--';
  const weatherIconCode = data.weather[0].icon || '';
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  document.getElementById('location').textContent = location;
  document.getElementById('temperature').textContent = `${temperature}°C`;
  document.getElementById('description').textContent = description;
  document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
  document.getElementById('humidity').textContent = `${humidity}%`;
  document.getElementById('wind').textContent = `${windSpeed} m/s`;
  document.getElementById('sunrise').textContent = sunrise;
  document.getElementById('sunset').textContent = sunset;

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  document.getElementById('weatherIcon').src = weatherIconUrl;
  document.getElementById('weatherIcon').alt = description;
}
