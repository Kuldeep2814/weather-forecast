// // WeatherPage.tsx
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "./WeatherPageStyles.css";

// const WeatherPageWrapper = styled.div`
//   /* Add styling here */
// `;

// const WeatherPage: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<any | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [unit, setUnit] = useState<string>("metric"); // Default unit is Celsius

//   useEffect(() => {
//     const cityName = window.location.pathname.split("/").pop(); // Get city name from URL
//     const apiKey = "a0a9b21d2a35a31e8a0655aee52b377d";
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

//     const fetchWeatherData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         setWeatherData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, [unit]);

//   const handleUnitChange = (newUnit: string) => {
//     setUnit(newUnit);
//   };

//   return (
//     <WeatherPageWrapper>
//       {loading ? (
//         <p>Loading...</p>
//       ) : weatherData ? (
//         <div>
//           <h2>
//             {weatherData.name}, {weatherData.sys.country}
//           </h2>
//           <p>
//             Temperature: {weatherData.main.temp}&deg;
//             {unit === "metric" ? "C" : "F"}
//           </p>
//           <p>Weather: {weatherData.weather[0].description}</p>
//           <p>Humidity: {weatherData.main.humidity}%</p>
//           <p>Wind Speed: {weatherData.wind.speed} m/s</p>
//           <p>Pressure: {weatherData.main.pressure} hPa</p>
//           <button onClick={() => handleUnitChange("metric")}>Celsius</button>
//           <button onClick={() => handleUnitChange("imperial")}>
//             Fahrenheit
//           </button>
//           <MapContainer
//             center={[weatherData.coord.lat, weatherData.coord.lon]}
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />
//             <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
//               <Popup position={[weatherData.coord.lat, weatherData.coord.lon]}>
//                 {weatherData.name}, {weatherData.sys.country}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       ) : (
//         <p>Failed to fetch weather data</p>
//       )}
//     </WeatherPageWrapper>
//   );
// };

// export default WeatherPage;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./WeatherPageStyles.css"; // Import the CSS file

const WeatherPageWrapper = styled.div`
  /* Add any additional styled-components styles here if needed */
`;

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<string>("metric"); // Default unit is Celsius

  useEffect(() => {
    const cityName = window.location.pathname.split("/").pop(); // Get city name from URL
    const apiKey = "a0a9b21d2a35a31e8a0655aee52b377d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [unit]);

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
  };

  return (
    <WeatherPageWrapper className="WeatherPageWrapper">
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
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
              <Popup position={[weatherData.coord.lat, weatherData.coord.lon]}>
                {weatherData.name}, {weatherData.sys.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Failed to fetch weather data</p>
      )}
    </WeatherPageWrapper>
  );
};

export default WeatherPage;
