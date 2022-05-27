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

const searchButtonEl = document.querySelector("#search-button");
const searchFieldEl = document.querySelector("#search-field");
const contentDivEl = document.querySelector("#content-div");

var city = "";

function search(city) {
    event.preventDefault();
    contentDivEl.classList.remove("hidden");
    var city = searchFieldEl.value.trim();
    console.log("city variable is set to " + city + ".");

    if (city) {
        fetchCityData(city);
        searchFieldEl.value = "";
    } else {
        alert("Please enter a valid city.")
    }
}

function fetchCityData() {
    console.log("Fetching city data for " + city);
}

searchButtonEl.addEventListener("click", search);
