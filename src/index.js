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
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7815148929416e89fc149fc11279799e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showCityWeather(response) {
  console.log(response.data);
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
  celsiusFeelsLike = Math.round(response.data.main.feels_like);
  celsiusMainTemp = Math.round(response.data.main.temp);
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  celsiusMinTemp = Math.round(response.data.main.temp_min);
  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = `${celsiusMainTemp}°C`;
  feelsLike.innerHTML = `${celsiusFeelsLike}˚`;
  lastUpdated.innerHTML = lastUpdatedTime(response.data.dt * 1000);
  showHumidity.innerHTML = `${response.data.main.humidity}`;
  showMaxTemp.innerHTML = `${celsiusMaxTemp}°`;
  showMinTemp.innerHTML = `${celsiusMinTemp}°`;
  showWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  textReport.innerHTML = response.data.weather[0].description;
  visibility.innerHTML = response.data.visibility / 1000;

  getForecast(response.data.coord);
}

function searchCityWeather(event) {
  event.preventDefault();
  //let cityName =
  let cityValue = document.querySelector("#city-value");
  let city = cityValue.value;
  //cityName.innerHTML = cityValue.value;
  let units = "metric";
  let apiKey = "7815148929416e89fc149fc11279799e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityWeather);
}

let currentDate = document.querySelector("#current-date");
let now = new Date();

currentDate.innerHTML = formatDate(now);
let currentHours = document.querySelector("#current-hour");
currentHours.innerHTML = formatHours(now);

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", searchCityWeather);

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
  celsiusFeelsLike = Math.round(response.data.main.feels_like);
  celsiusMainTemp = Math.round(response.data.main.temp);
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  celsiusMinTemp = Math.round(response.data.main.temp_min);
  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = `${celsiusMainTemp}°C`;
  feelsLike.innerHTML = `${celsiusFeelsLike}˚`;
  lastUpdated.innerHTML = lastUpdatedTime(response.data.dt * 1000);
  showHumidity.innerHTML = `${response.data.main.humidity}`;
  showMaxTemp.innerHTML = `${celsiusMaxTemp}°`;
  showMinTemp.innerHTML = `${celsiusMinTemp}°`;
  showWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  textReport.innerHTML = response.data.weather[0].description;
  visibility.innerHTML = response.data.visibility / 1000;

  getForecast(response.data.coord);
}

let currentCityButton = document.querySelector("#search-current-city");
currentCityButton.addEventListener("click", getLocation);

function getLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let mainTemp = document.querySelector("#current-temp");
  let fahrenheitMainTemp = (celsiusMainTemp * 9) / 5 + 32;
  mainTemp.innerHTML = `${Math.round(fahrenheitMainTemp)}°F`;
  let feelsLike = document.querySelector("#feels-like");
  let fahrenheitFeelsLike = (celsiusFeelsLike * 9) / 5 + 32;
  feelsLike.innerHTML = `${Math.round(fahrenheitFeelsLike)}˚`;
  let maxTemp = document.querySelector("#max-temp");
  let fahrenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;
  maxTemp.innerHTML = `${Math.round(fahrenheitMaxTemp)}˚`;
  let minTemp = document.querySelector("#min-temp");
  let fahrenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
  minTemp.innerHTML = `${Math.round(fahrenheitMinTemp)}˚`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let mainTemp = document.querySelector("#current-temp");
  mainTemp.innerHTML = `${celsiusMainTemp}°C`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${celsiusFeelsLike}°`;
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = `${celsiusMaxTemp}°`;
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = `${celsiusMinTemp}°`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
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

let celsiusMainTemp = null;
let celsiusFeelsLike = null;
let celsiusMaxTemp = null;
let celsiusMinTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);
