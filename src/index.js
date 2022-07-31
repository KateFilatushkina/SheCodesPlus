let now = new Date();
let p = document.querySelector("#currentDay");
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
let hours = now.getHours();
//let minutes = now.getMinutes();
let minutes = String(now.getMinutes()).padStart(2, "0");

p.innerHTML = `${day}<br />${hours}:${minutes}`;

function search(event) {
  event.preventDefault("#searchForm");
  let searchInput = document.querySelector("#searchFormInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;

  let apiKey = "74b865ca5035f3429a2f339ef4d0bb28";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function celsiusToFahrenheit(c) {
  return c * (9 / 5) + 32;
}
function fahrenheitToCelsius(f) {
  return (f - 32) * (5 / 9);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

let temperature = document.getElementById("temperature");
let tempType = document.getElementById("tempType");
tempType.onclick = function () {
  let temp = parseInt(temperature.innerHTML);
  let newTemp = 0;

  if (this.type == "c") {
    newTemp = celsiusToFahrenheit(temp);
    this.type = "f";
    this.innerHTML = "&deg;F";
  } else if (this.type == "f") {
    newTemp = fahrenheitToCelsius(temp);
    this.type = "c";
    this.innerHTML = "&deg;C";
  } else {
    return false;
  }

  temperature.innerHTML = Math.round(newTemp, 0);
};

function showWeather(response) {
  let temperatureElement = document.getElementById("temperature");
  let temperature = Math.round(response.data.main.temp);
  let desription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
