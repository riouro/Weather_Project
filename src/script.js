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

function formatWeekday(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  forecast.forEach(function (weekdays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-sm-2">
      <div class="card" style="width: 5rem;">
       <div class="card-body-forecast">
        <span class="card-titles-weekday">${formatWeekday(weekdays.dt)}</span>
        <img src=
        "http://openweathermap.org/img/wn/${weekdays.weather[0].icon}@2x.png"
         class="card-img-bottom"/>
        <p class="card-temperature">
        <span class="forecast-temp-max" >
        ${Math.round(weekdays.temp.max)}° |
        </span> 
        <span class="forecast-temp-min"> 
        ${Math.round(weekdays.temp.min)}°
        </span>
        </p>
       </div>
      </div>
     </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`; //closing the row;
  forecastElement.innerHTML = forecastHTML;
}

function getCoordinates(coordinates) {
  let appid = "ad3c20dfab625c21a27f1d4566b62148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appid}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showLocation(response) {
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

  getCoordinates(response.data.coord);
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

function displayCelsius(event) {
  event.preventDefault();
  let shownTemp = document.querySelector("#actual-temperature");
  shownTemp.innerHTML = Math.round(celsiusTemp);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

search("Berlin");
