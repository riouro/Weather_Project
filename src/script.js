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
  let citySearch = response.data.name;
  let h3 = document.querySelector("#city-name");
  h3.innerHTML = `${citySearch}`;

  let actualTemp = Math.round(response.data.main.temp);
  let tempShown = document.querySelector("#actual-temperature");
  tempShown.innerHTML = `${actualTemp}`;
}

function showResults(position) {
  position.preventDefault();
  let city = document.querySelector("#text-input").value;
  let untis = "metric";
  let appid = "ad3c20dfab625c21a27f1d4566b62148";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${untis}&appid=${appid}`;
  axios.get(url).then(showLocation);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", showResults);
