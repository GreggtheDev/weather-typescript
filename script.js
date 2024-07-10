// Add an event listener to the form with the ID 'weather-form' to listen for the 'submit' event
document
  .getElementById("weather-form")
  .addEventListener("submit", function (e) {
    // Prevent the default form submission behavior to handle it via JavaScript
    e.preventDefault();
    // Get the value of the input field with the ID 'zip'
    const zip = document.getElementById("zip").value;
    // Call the function to fetch and display weather data for the provided zip code
    getWeatherData(zip);
  });

// Function to fetch weather data from the OpenWeatherMap API
function getWeatherData(zip) {
  const apiKey = "4479492207e3f757cb6b2037b61195e3"; // API key for OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

  // Use the Fetch API to get data from the weather API
  fetch(url)
    .then((response) => {
      // Check if the response is not okay, if so, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response JSON data
      return response.json();
    })
    .then((data) => {
      // Call the function to display the weather data
      displayWeatherData(data);
    })
    .catch((error) => {
      // Log any errors to the console and alert the user
      console.error("Error fetching weather data:", error);
      alert(
        "Failed to fetch weather data. Please check the zip code and try again."
      );
    });
}

// Function to display the fetched weather data on the webpage
function displayWeatherData(data) {
  // Check if the data is invalid or doesn't contain the necessary information
  if (!data || !data.main) {
    console.error("Invalid weather data:", data);
    alert("Failed to retrieve valid weather data. Please try again later.");
    return;
  }
  // Get the current date
  const date = new Date().toLocaleDateString();
  // Get the city name from the data
  const city = data.name;
  // Get the temperature from the data
  const temperature = data.main.temp;
  // Get the weather conditions description from the data
  const conditions = data.weather[0].description;
  // Get the high and low temperatures from the data
  const tempHiLo = `High: ${data.main.temp_max}°F / Low: ${data.main.temp_min}°F`;

  // Display the fetched data in the corresponding HTML elements
  document.getElementById("date").textContent = `Date: ${date}`;
  document.getElementById("city").textContent = `City: ${city}`;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${temperature}°F`;
  document.getElementById(
    "conditions"
  ).textContent = `Conditions: ${conditions}`;
  document.getElementById("temp-hi-lo").textContent = tempHiLo;
}
