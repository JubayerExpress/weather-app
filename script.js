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
  alert(`Error: ${error.message}`);
}

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 7ff0084309fdee6f3c40546a100ad34c ; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert('Error fetching weather data');
    });
}

function displayWeather(data) {
  const location = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherIconCode = data.weather[0].icon;
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

  // Update weather icon
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  document.getElementById('weatherIcon').src = weatherIconUrl;
  document.getElementById('weatherIcon').alt = description;
}
