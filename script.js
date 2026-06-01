const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// ===== GRAB HTML ELEMENTS =====
// We use getElementById to find each element we want to update
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorMsg = document.getElementById("error-msg");
const weatherCard = document.getElementById("weather-card");

const cityName = document.getElementById("city-name");
const country = document.getElementById("country");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const feelsLike = document.getElementById("feels-like");

// ===== MAIN FUNCTION: FETCH WEATHER DATA =====
// async means this function can wait for the API to respond
async function getWeather(city) {
  // Hide any previous error or card before a new search
  errorMsg.style.display = "none";
  weatherCard.style.display = "none";

  try {
    // Build the full API URL with the city name, API key, and metric units (Celsius)
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    // fetch() sends a request to the API — await pauses until we get a response
    const response = await fetch(url);

    // If the city wasn't found, the API returns a non-OK status
    if (!response.ok) {
      throw new Error("City not found");
    }

    // Convert the response into a JavaScript object we can read
    const data = await response.json();

    // ===== FILL THE CARD WITH REAL DATA =====
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    // The API gives us an icon code — we turn it into an image URL
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Show the weather card now that it's filled with data
    weatherCard.style.display = "block";
  } catch (error) {
    // If anything went wrong (bad city name, no internet etc.) show the error message
    errorMsg.style.display = "block";
  }
}

// ===== EVENT LISTENERS =====
// When the search button is clicked, run getWeather with whatever is in the input
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim(); // .trim() removes accidental spaces
  if (city !== "") {
    getWeather(city);
  }
});

// When the user presses Enter in the input box, also run getWeather
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});
