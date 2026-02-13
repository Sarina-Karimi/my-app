import React, { useState } from "react";
import axios from "axios";
import "./App.css";
export default function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);
  function showTemperature(response) {
    setTemperature(response.data.temperature.current);
    setCondition(response.data.condition.description);
    setIcon(response.data.condition.icon_url);
    setHumidity(response.data.temperature.humidity);
    setWind(response.data.wind.speed);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=707b228tfod34a6602695b296fa44bb3`;
    axios.get(url).then(showTemperature);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Enter a city.." onChange={changeCity}/>
        <input type="submit" value="Search"/>
      </form>

      {temperature && condition && (
        <div>
          <ul>
            <li>Temperature: {temperature}°C</li>
            <li>Description: {condition}</li>
            <li>Humidity: {humidity}%</li>
            <li>Wind: {wind}km/h </li>
            {icon && <li><img src={icon} alt={condition} /></li>}
          </ul>
        </div>
      )}
    </div>
  );
}
