// CityTable.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./CityTable.css"; // Import the CSS file

const CityTableWrapper = styled.div`
  /* No need to add styling here */
`;

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
        );
        const data = await response.json();
        setCities(data.results);
        setFilteredCities(data.results); // Initialize filteredCities with all cities
      } catch (error) {
        console.error("Error fetching cities data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter cities based on search term
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCities(filtered);
  };

  return (
    <CityTableWrapper className="CityTableWrapper">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* City table */}
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
            {/* Add more columns here */}
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city) => (
            <tr key={city.geoname_id}>
              <td>
                {/* Link to WeatherPage */}
                <Link to={`/weather/${city.name}`}>{city.name}</Link>
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
              {/* Add more cells here */}
            </tr>
          ))}
        </tbody>
      </table>
    </CityTableWrapper>
  );
};

export default CityTable;
