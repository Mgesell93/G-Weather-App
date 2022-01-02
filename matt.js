function displayTemperature(repsonse) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let lastUpdated = document.querySelector("#current-date");
  lastUpdated.innerHTML = lastUpdatedTime(response.data.dt * 1000);
}
let apiKey = "7815148929416e89fc149fc11279799e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);

function lastUpdatedTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${minutes}`;
  }

  return `${hours}${minutes}`;
}
