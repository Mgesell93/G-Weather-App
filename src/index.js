// initiates sequence to display current date & last updated
let currentDate = document.querySelector("#current-date");
let now = new Date();
currentDate.innerHTML = formatDate(now);

function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let dateNow = now.getDate();
  let day = days[now.getDay()];
  return `${day} ${dateNow} ${month}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function formatHours() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function lastUpdatedTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
}

// search button
let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", searchCityWeather);

function searchCityWeather(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#city-value");
  let city = cityValue.value;
  let units = "metric";
  let apiKey = "7815148929416e89fc149fc11279799e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityWeather);
}

function showCityWeather(response) {
  let bigWeatherIcon = document.querySelector("#big-weather-icon");
  let cityName = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let lastUpdated = document.querySelector("#last-updated");
  let showHumidity = document.querySelector("#humidity");
  let showMaxTemp = document.querySelector("#max-temp");
  let showMinTemp = document.querySelector("#min-temp");
  let showWind = document.querySelector("#wind");
  let textReport = document.querySelector("#text-report");
  let visibility = document.querySelector("#visibility");

  bigWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  bigWeatherIcon.setAttribute("alt", response.data.weather[0].description);
  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}˚`;
  lastUpdated.innerHTML = lastUpdatedTime(response.data.dt * 1000);
  showHumidity.innerHTML = `${response.data.main.humidity}`;
  showMaxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  showMinTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  showWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  textReport.innerHTML = response.data.weather[0].description;
  visibility.innerHTML = response.data.visibility / 1000;

  getForecast(response.data.coord);
}

// protocol for displaying current city weather

let currentCityButton = document.querySelector("#search-current-city");
currentCityButton.addEventListener("click", getLocation);

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(postion) {
  console.log(postion);
  let latitude = postion.coords.latitude;
  let longitude = postion.coords.longitude;
  let units = "metric";
  let apiKey = "7815148929416e89fc149fc11279799e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}

function showCurrentCityWeather(response) {
  console.log(response);
  let bigWeatherIcon = document.querySelector("#big-weather-icon");
  let cityName = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let lastUpdated = document.querySelector("#last-updated");
  let showHumidity = document.querySelector("#humidity");
  let showMaxTemp = document.querySelector("#max-temp");
  let showMinTemp = document.querySelector("#min-temp");
  let showWind = document.querySelector("#wind");
  let textReport = document.querySelector("#text-report");
  let visibility = document.querySelector("#visibility");

  bigWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  bigWeatherIcon.setAttribute("alt", response.data.weather[0].description);
  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}˚`;
  lastUpdated.innerHTML = lastUpdatedTime(response.data.dt * 1000);
  showHumidity.innerHTML = `${response.data.main.humidity}`;
  showMaxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  showMinTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  showWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  textReport.innerHTML = response.data.weather[0].description;
  visibility.innerHTML = response.data.visibility / 1000;

  getForecast(response.data.coord);
}

// forecast for current and search city

function getForecast(coordinates) {
  let apiKey = "7815148929416e89fc149fc11279799e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row g-5">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2 day-forecast">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://www.openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />

                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}</span>
                </div>
              </div>
            
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
