const searchbar = document.querySelector('[data-searchbar]');
const searchBtn = document.querySelector('[data-search-button]');
const curWCDisplay = document.querySelector('.curWC');
const curWFDisplay = document.querySelector('.curWF');
const locationDisplay = document.querySelector('.location');
let searchValue;

searchBtn.addEventListener('click', (event) => {
  console.log('Searching......');
  event.preventDefault();
  searchValue = searchbar.value;
  weather(searchValue);
  searchbar.value = '';
});

const weather = async function (searchValue) {
  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0c830a8963bd484c88d112121240305&q=${searchValue}`
  );
  const data = await res.json();
  console.log(data);
  const city = data.location.name;
  const country = data.location.country;
  const curTempC = data.current.temp_c;
  const curTempF = data.current.temp_f;
  curWCDisplay.append(curTempC);
  curWFDisplay.append(curTempF);
  locationDisplay.append(`${city}, ${country}`);
};

const toggleBtn = document.createElement('button');
document.body.appendChild(toggleBtn);
let isCelsius = true;

toggleBtn.addEventListener('click', () => {
  isCelsius = !isCelsius;
  updateTemperatureDisplay();
});

function updateTemperatureDisplay() {
  if (isCelsius) {
    curWCDisplay.style.display = 'block';
    curWFDisplay.style.display = 'none';
    toggleBtn.textContent = 'Switch to F';
  } else {
    curWCDisplay.style.display = 'none';
    curWFDisplay.style.display = 'block';
    toggleBtn.textContent = 'Switch to C';
  }
}

updateTemperatureDisplay();
