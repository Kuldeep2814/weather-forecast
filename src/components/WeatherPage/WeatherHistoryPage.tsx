import React from "react";
import { Link } from "react-router-dom";

const WeatherHistoryPage: React.FC = () => {
  const weatherHistory = JSON.parse(
    localStorage.getItem("weatherHistory") || "[]"
  );

  return (
    <div>
      <h1>Weather History</h1>
      <ul>
        {weatherHistory.map((item: any, index: number) => (
          <li key={index}>
            <Link to={`/weather/${item.cityName}`}>{item.cityName}</Link>
            <p>Temperature: {item.data.main.temp}&deg;C</p>
            <p>Weather: {item.data.weather[0].description}</p>
            <p>Humidity: {item.data.main.humidity}%</p>
            <p>Wind Speed: {item.data.wind.speed} m/s</p>
            <p>Pressure: {item.data.main.pressure} hPa</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherHistoryPage;
