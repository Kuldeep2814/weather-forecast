import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTable from "./components/CityTable/CityTable";
import WeatherPage from "./components/WeatherPage/WeatherPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CityTable />} />
        <Route path="/weather/:cityName" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
