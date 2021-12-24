function formatDate(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function showCityWeather(response) {
  // console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${cityTemp}°C`;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;
  let textReport = document.querySelector("#text-report");
  textReport.innerHTML = response.data.weather[0].description;
  let showMaxTemp = document.querySelector("#max-temp");
  let maxTemp = Math.round(response.data.main.temp_max);
  showMaxTemp.innerHTML = `${maxTemp}°`;
  let showMinTemp = document.querySelector("#min-temp");
  let minTemp = Math.round(response.data.main.temp_min);
  showMinTemp.innerHTML = `${minTemp}°`;
  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;

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

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", searchCityWeather);

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", searchCityWeatherCelsius);

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", searchCityWeatherFahrenheit);

//let celsiusTemp = 20;

function retrievePosition(postion) {
  console.log(postion);
  let latitude = postion.coords.latitude;
  let longitude = postion.coords.longitude;
  let units = "metric";
  let apiKey = "7815148929416e89fc149fc11279799e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentCityWeather);
}

function showCurrentCityWeather(response) {
  console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${cityTemp}°C`;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;
  let textReport = document.querySelector("#text-report");
  textReport.innerHTML = response.data.weather[0].description;
  let showMaxTemp = document.querySelector("#max-temp");
  let maxTemp = Math.round(response.data.main.temp_max);
  showMaxTemp.innerHTML = `${maxTemp}°`;
  let showMinTemp = document.querySelector("#min-temp");
  let minTemp = Math.round(response.data.main.temp_min);
  showMinTemp.innerHTML = `${minTemp}°`;
  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;
}

let currentCityButton = document.querySelector("#search-current-city");
currentCityButton.addEventListener("click", getLocation);

function getLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
