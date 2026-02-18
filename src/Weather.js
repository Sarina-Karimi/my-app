import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  // Forecast fetcher
  const getForecast = useCallback((city) => {
    const apiKey = "b2a5adcct04b33178913oc335f405433";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setForecast(response.data.daily);
    });
  }, []);

  // Main weather response handler
  const handleResponse = useCallback(
    (response) => {
      setWeather(response.data);
      getForecast(response.data.city);
    },
    [getForecast]
  );

  // Search function
  const searchCity = useCallback(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }, [city, handleResponse]);

  // Initial load
  useEffect(() => {
    searchCity();
  }, [searchCity]);

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const hours = date.getHours();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${days[date.getDay()]} ${hours}:${minutes}`;
  }

  return (
    <div className="weather-app">
      <header>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            required
            className="search-form-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="submit"
            value="Search"
            className="search-form-button"
          />
        </form>
      </header>

      {weather && (
        <main>
          <div className="weather-app-data">
            <div>
              <h1 className="weather-app-city">{weather.city}</h1>

              <p className="weather-app-details">
                {formatDate(weather.time)}, {weather.condition.description}
                <br />
                Humidity: <strong>{weather.temperature.humidity}%</strong>,
                Wind: <strong>{weather.wind.speed} km/h</strong>
              </p>
            </div>

            <div className="weather-app-temperature-container">
              <img
                src={weather.condition.icon_url}
                alt=""
                className="weather-app-icon"
              />
              <div className="weather-app-temperature">
                {Math.round(weather.temperature.current)}
              </div>
              <div className="weather-app-unit">°C</div>
            </div>
          </div>

          <div className="weather-forecast">
            {forecast.slice(1, 6).map((day, index) => {
              const date = new Date(day.time * 1000);
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });

              return (
                <div key={index}>
                  <div className="weather-forecast-date">{dayName}</div>

                  <img
                    src={day.condition.icon_url}
                    alt=""
                    className="weather-forecast-icon"
                  />

                  <div className="weather-forecast-temperatures">
                    <div className="weather-forecast-temperature">
                      <strong>{Math.round(day.temperature.maximum)}°</strong>
                    </div>
                    <div className="weather-forecast-temperature">
                      {Math.round(day.temperature.minimum)}°
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}
    </div>
  );
}
