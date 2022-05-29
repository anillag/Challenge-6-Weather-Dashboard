// WHEN I search for a city
// THEN I am presented with current and future conditions
//      for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon
//      representation of weather conditions, the temperature,
//      the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the
//      conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the
//      date, an icon representation of weather conditions, the
//      temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions
//      for that city

const apiKey = "44c256ba557f09fec96378b158180589";
const searchButtonEl = document.querySelector("#search-button");
const searchFieldEl = document.querySelector("#search-field");
const pastSearchesEl = document.querySelector("#past-searches");
const contentDivEl = document.querySelector("#content-div");
const cityDateEl = document.querySelector("#city-date");
const cityDateImageEl = document.querySelector("#city-date-image");
const tempEl = document.querySelector("#temp");
const windEl = document.querySelector("#wind");
const humidityEl = document.querySelector("#humidity");
const uvIndexEl = document.querySelector("#uv-index");
const dayOneDateEl = document.querySelector("#day-one-date");
const dayOneTempEl = document.querySelector("#day-one-temp");
const dayOneWindEl = document.querySelector("#day-one-wind");
const dayOneHumidityEl = document.querySelector("#day-one-humidity");
const dayTwoDateEl = document.querySelector("#day-two-date");
const dayTwoTempEl = document.querySelector("#day-two-temp");
const dayTwoWindEl = document.querySelector("#day-two-wind");
const dayTwoHumidityEl = document.querySelector("#day-two-humidity");
const dayThreeDateEl = document.querySelector("#day-three-date");
const dayThreeTempEl = document.querySelector("#day-three-temp");
const dayThreeWindEl = document.querySelector("#day-three-wind");
const dayThreeHumidityEl = document.querySelector("#day-three-humidity");
const dayFourDateEl = document.querySelector("#day-four-date");
const dayFourTempEl = document.querySelector("#day-four-temp");
const dayFourWindEl = document.querySelector("#day-four-wind");
const dayFourHumidityEl = document.querySelector("#day-four-humidity");
const dayFiveDateEl = document.querySelector("#day-five-date");
const dayFiveTempEl = document.querySelector("#day-five-temp");
const dayFiveWindEl = document.querySelector("#day-five-wind");
const dayFiveHumidityEl = document.querySelector("#day-five-humidity");
const dayOneImageEl = document.querySelector("#day-one-image");
const dayTwoImageEl = document.querySelector("#day-two-image");
const dayThreeImageEl = document.querySelector("#day-three-image");
const dayFourImageEl = document.querySelector("#day-four-image");
const dayFiveImageEl = document.querySelector("#day-five-image");

function search(city) {
    event.preventDefault();
    contentDivEl.classList.remove("hidden");
    city = searchFieldEl.value.trim();

    if (city) {
        fetchCityData(city);
        searchFieldEl.value = "";
    } else {
        alert("Please enter a valid city.");
    }
    localStorage.setItem("searchHistory", city);
}

var fetchCityData = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        var lat = JSON.stringify(data.coord.lat);
                        var lon = JSON.stringify(data.coord.lon);
                        fetchCurrentConditions(city, lat, lon);
                    });
            } else {
                alert("fetchCityData, fetch.then, else response.err:  Error response " + response.statusText);
            };
        });
};

var fetchCurrentConditions = function(city, lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function(response) {
        if (response.ok) {
            response.json()
                .then(function(data) {
                    var date = new Date(JSON.stringify(data.current.dt)*1000).toLocaleDateString("en-US");
                    var icon = JSON.stringify(data.current.weather[0].icon).slice(1, -1);
                    cityDateEl.innerHTML = city + " " + date +
                    "<img id='city-state-image' src='https://openweathermap.org/img/wn/" + icon + ".png'>";
                    var temp = parseFloat((JSON.stringify(data.current.temp)-273.15)*1.8+32).toFixed(0);
                    tempEl.textContent = "Temp: " + temp + "°F";
                    var wind = parseFloat(JSON.stringify(data.current.wind_speed)).toFixed(0);
                    windEl.textContent = "Wind: " + wind + " mph";
                    var humidity = JSON.stringify(data.current.humidity);
                    humidityEl.textContent = "Humidity: " + humidity + "%";
                    var uvIndex = JSON.stringify(data.current.uvi);
                    uvIndexEl.textContent = "UV Index: " + uvIndex;
                    if (uvIndex <= 2.49) {
                        uvIndexEl.classList.add("uv-2");
                        uvIndexEl.classList.remove("uv-5", "uv-7", "uv-10", "uv-11");
                    } else if (uvIndex >= 2.50 && uvIndex <= 5.49) {
                        uvIndexEl.classList.add("uv-5");
                        uvIndexEl.classList.remove("uv-2", "uv-7", "uv-10", "uv-11");
                    } else if (uvIndex >= 5.50 && uvIndex <= 7.49) {
                        uvIndexEl.classList.add("uv-7");
                        uvIndexEl.classList.remove("uv-2", "uv-5", "uv-10", "uv-11");
                    } else if (uvIndex >= 7.50 && uvIndex <= 10.49) {
                        uvIndexEl.classList.add("uv-10");
                        uvIndexEl.classList.remove("uv-2", "uv-5", "uv-7", "uv-11");
                    } else if (uvIndex >=10.5) {
                        uvIndexEl.classList.add("uv-11");
                        uvIndexEl.classList.remove("uv-2", "uv-5", "uv-7", "uv-10");
                    }
                });
            } else {
                alert("fetch.then, else response.err:  Error response " + response.statusText);
            };
        });
        fetchFiveDayForecast(apiUrl);
    };
    
var fetchFiveDayForecast = function(apiUrl) {
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
                .then(function(data) {
                    var dayOneDate = new Date(JSON.stringify(data.daily[1].dt)*1000).toLocaleDateString("en-US");
                    dayOneDateEl.textContent = dayOneDate;
                    var dayTwoDate = new Date(JSON.stringify(data.daily[2].dt)*1000).toLocaleDateString("en-US");
                    dayTwoDateEl.textContent = dayTwoDate;
                    var dayThreeDate = new Date(JSON.stringify(data.daily[3].dt)*1000).toLocaleDateString("en-US");
                    dayThreeDateEl.textContent = dayThreeDate;
                    var dayFourDate = new Date(JSON.stringify(data.daily[4].dt)*1000).toLocaleDateString("en-US");
                    dayFourDateEl.textContent = dayFourDate;
                    var dayFiveDate = new Date(JSON.stringify(data.daily[5].dt)*1000).toLocaleDateString("en-US");
                    dayFiveDateEl.textContent = dayFiveDate;
                    var dayOneTemp = parseFloat((JSON.stringify(data.daily[1].temp.day)-273.15)*1.8+32).toFixed(0);
                    dayOneTempEl.textContent = "Temp: " + dayOneTemp + "°F";
                    var dayTwoTemp = parseFloat((JSON.stringify(data.daily[2].temp.day)-273.15)*1.8+32).toFixed(0);
                    dayTwoTempEl.textContent = "Temp: " + dayTwoTemp + "°F";
                    var dayThreeTemp = parseFloat((JSON.stringify(data.daily[3].temp.day)-273.15)*1.8+32).toFixed(0);
                    dayThreeTempEl.textContent = "Temp: " + dayThreeTemp + "°F";
                    var dayFourTemp = parseFloat((JSON.stringify(data.daily[4].temp.day)-273.15)*1.8+32).toFixed(0);
                    dayFourTempEl.textContent = "Temp: " + dayFourTemp + "°F";
                    var dayFiveTemp = parseFloat((JSON.stringify(data.daily[5].temp.day)-273.15)*1.8+32).toFixed(0);
                    dayFiveTempEl.textContent = "Temp: " + dayFiveTemp + "°F";
                    var dayOneWind = parseFloat(JSON.stringify(data.daily[1].wind_speed)).toFixed(0);
                    dayOneWindEl.textContent = "Wind: " + dayOneWind + " mph";
                    var dayTwoWind = parseFloat(JSON.stringify(data.daily[2].wind_speed)).toFixed(0);
                    dayTwoWindEl.textContent = "Wind: " + dayTwoWind + " mph";
                    var dayThreeWind = parseFloat(JSON.stringify(data.daily[3].wind_speed)).toFixed(0);
                    dayThreeWindEl.textContent = "Wind: " + dayThreeWind + " mph";
                    var dayFourWind = parseFloat(JSON.stringify(data.daily[4].wind_speed)).toFixed(0);
                    dayFourWindEl.textContent = "Wind: " + dayFourWind + " mph";
                    var dayFiveWind = parseFloat(JSON.stringify(data.daily[5].wind_speed)).toFixed(0);
                    dayFiveWindEl.textContent = "Wind: " + dayFiveWind + " mph";
                    var dayOneHumidity = JSON.stringify(data.daily[1].humidity);
                    dayOneHumidityEl.textContent = "Humidity: " + dayOneHumidity + "%";
                    var dayTwoHumidity = JSON.stringify(data.daily[2].humidity);
                    dayTwoHumidityEl.textContent = "Humidity: " + dayTwoHumidity + "%";
                    var dayThreeHumidity = JSON.stringify(data.daily[3].humidity);
                    dayThreeHumidityEl.textContent = "Humidity: " + dayThreeHumidity + "%";
                    var dayFourHumidity = JSON.stringify(data.daily[4].humidity);
                    dayFourHumidityEl.textContent = "Humidity: " + dayFourHumidity + "%";
                    var dayFiveHumidity = JSON.stringify(data.daily[5].humidity);
                    dayFiveHumidityEl.textContent = "Humidity: " + dayFiveHumidity + "%";
                    var dayOneImage = JSON.stringify(data.daily[1].weather[0].icon).slice(1, -1);
                    dayOneImageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayOneImage + ".png");
                    var dayTwoImage = JSON.stringify(data.daily[2].weather[0].icon).slice(1, -1);
                    dayTwoImageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayTwoImage + ".png");
                    var dayThreeImage = JSON.stringify(data.daily[3].weather[0].icon).slice(1, -1);
                    dayThreeImageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayThreeImage + ".png");
                    var dayFourImage = JSON.stringify(data.daily[4].weather[0].icon).slice(1, -1);
                    dayFourImageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayFourImage + ".png");
                    var dayFiveImage = JSON.stringify(data.daily[5].weather[0].icon).slice(1, -1);
                    dayFiveImageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayFiveImage + ".png");
                })
            }
        })
}

searchButtonEl.addEventListener("click", search);