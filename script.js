document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 7ff0084309fdee6f3c40546a100ad34c ;
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
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  document.getElementById('location').textContent = `Location: ${location}`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
  document.getElementById('description').textContent = `Weather: ${description}`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`;
}
