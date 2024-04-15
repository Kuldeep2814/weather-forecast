import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./WeatherPageStyles.css";
import "leaflet/dist/leaflet.css";

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<string>("metric");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchWeatherData = async (cityName: string) => {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        saveWeatherToLocalStorage(cityName, data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      }
      setLoading(false);
    };

    const saveWeatherToLocalStorage = (cityName: string, data: any) => {
      const weatherHistory = JSON.parse(
        localStorage.getItem("weatherHistory") || "[]"
      );
      const updatedWeatherHistory = [...weatherHistory, { cityName, data }];
      localStorage.setItem(
        "weatherHistory",
        JSON.stringify(updatedWeatherHistory)
      );
    };

    const cityName = window.location.pathname.split("/").pop();
    if (cityName) {
      fetchWeatherData(cityName);
    }
  }, [unit]);

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
  };

  return (
    <div className="WeatherPageWrapper">
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div className="WeatherCard">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            Temperature: {weatherData.main.temp}&deg;
            {unit === "metric" ? "C" : "F"}
          </p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <button onClick={() => handleUnitChange("metric")}>Celsius</button>
          <button onClick={() => handleUnitChange("imperial")}>
            Fahrenheit
          </button>
          <div className="MapWrapper">
            <MapContainer
              center={[weatherData.coord.lat, weatherData.coord.lon]}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
              className="MapContainer"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
                <Popup
                  position={[weatherData.coord.lat, weatherData.coord.lon]}
                >
                  {weatherData.name}, {weatherData.sys.country}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <p>Failed to fetch weather data</p>
      )}
    </div>
  );
};

export default WeatherPage;
