const api = {
  key: '9a33b70a8966f57bc8e952889d67a5d7',
  baseurl: 'https://api.openweathermap.org/data/2.5/',
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery)
function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value)
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);

  let city = document.querySelector('.location .city');
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .data');
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`

  let weatherEl = document.querySelector('.weather');
  const icon = document.querySelector('.weather-icon');
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
  weatherEl.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
  
}

function dateBuilder(s) {
  let = months = [
    'January','February','March','April','May','June','July','August','September','Octomber','November','December'];

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thuraday',
    'Frisday',
    'Saturday'
  ];

  let day = days[s.getDay()-1];
  let data = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();
  console.log(s.getDay());

  
  return `${day} ${data} ${month} ${year}`;
}