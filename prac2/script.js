const weatherData = {
  Ahmedabad: "40°C",
  Delhi: "38°C",
  Mumbai: "35°C",
  Jaipur: "42°C",
  Bangalore: "30°C",
  Surat: "37°C",
  Rajkot: "39°C"
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (weatherData[city]) {
    result.textContent = `The weather in ${city} is ${weatherData[city]}`;
  } else {
    result.textContent = `Sorry, weather data for "${city}" is not available.`;
  }
});