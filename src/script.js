new Date();
let current = new Date();

function dateFormat() {
  let time = document.querySelector("span#currentTime");
  let date = document.querySelector("span#currentDate");

  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = current.getMinutes();
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
  let day = days[current.getDay()];

  time.innerHTML = `${hours}:${minutes}`;
  date.innerHTML = `${day}`;
}
dateFormat();

function showLocation(response) {
  console.log(response.data);

  let citySearch = response.data.name;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = `${citySearch}`;

  let actualTemp = Math.round(response.data.main.temp);
  let tempShown = document.querySelector("#actual-temperature");
  tempShown.innerHTML = `${actualTemp}`;

  let wDescription = document.querySelector("#weather-description");
  wDescription.innerHTML = response.data.weather[0].description;

  let humidityDescript = document.querySelector("#humidity");
  humidityDescript.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let weatherImage = document.querySelector("#icon");
  weatherImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherImage.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
}

function search(city) {
  let untis = "metric";
  let appid = "ad3c20dfab625c21a27f1d4566b62148";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${untis}&appid=${appid}`;
  axios.get(url).then(showLocation);
}

function handleSubmit(position) {
  position.preventDefault();
  let city = document.querySelector("#text-input").value;
  search(city);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let shownTemp = document.querySelector("#actual-temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  shownTemp.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let shownTemp = document.querySelector("#actual-temperature");
  shownTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", displayFahrenheit);

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", displayCelsius);

search("Berlin");
