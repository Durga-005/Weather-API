// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");       // Input city name
  const [weather, setWeather] = useState(null); // Weather data
  const [error, setError] = useState("");

  const apiKey = "17895646eb5718781d218d6034c5c455"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (err) {
      setWeather(null);
      setError("Error fetching weather");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="app">
      <h1>Weather App 🌤️</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
