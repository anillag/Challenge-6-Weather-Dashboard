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
const contentDivEl = document.querySelector("#content-div");


function search(city) {
    event.preventDefault();
    contentDivEl.classList.remove("hidden");
    city = searchFieldEl.value.trim();
    console.log("search:  city variable is set to " + city + ".");

    if (city) {
        console.log("search:  city variable " + city + " is valid.");
        fetchCityData(city);
        searchFieldEl.value = "";
    } else {
        alert("Please enter a valid city.")
    }
}

var fetchCityData = function(city) {
    console.log("fetchCityData:  fetching city data for " + city + ".");
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log("fetchCityData, apiURL:  Fetching from " + apiUrl);
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log("fetchCityData, fetch.then:  Response is " + response + ".");
                response.json()
                    .then(function(data) {
                        console.log("fetchCityData, fetch.then, if response.ok, response.then:  data variable is " + JSON.stringify(data));
                        var lat = JSON.stringify(data.coord.lat);
                        var lon = JSON.stringify(data.coord.lon);
                        console.log("fetchCityData, fetch.then, if response.ok, response.then:  Coordinates for " + city + " are " + lat + " " + lon);
                        fetchCurrentConditions(city, lat, lon);
                    });
            } else {
                alert("fetch.then, else response.err:  Error reponse " + response.statusText);
            }
        })
}

var fetchCurrentConditions = function(city, lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    console.log("fetchCurrentConditions:  new apiURL variable is " + apiUrl);
    fetch(apiUrl)
        .then(function(response) {
        if (response.ok) {

        }
        })
}

searchButtonEl.addEventListener("click", search);
