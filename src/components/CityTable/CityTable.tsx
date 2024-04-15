import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./CityTable.css";

const CityTableWrapper = styled.div`
  /* No need to add styling here */
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background-color: ${(props) => (props.isFavorite ? "#203539" : "#366871")};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchWeatherDataByCity = async (cityName: string) => {
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
  };

  const handleGetCurrentLocationWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            // Redirect to WeatherPage with the current location weather data
            window.location.href = `/weather/${data.name}`;
          } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Failed to fetch weather data. Please try again later.");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
          setError(
            "Failed to get geolocation. Please enable location access and try again."
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const newCities = data.results;
        setCities((prevCities) => [...prevCities, ...newCities]);
        setFilteredCities((prevCities) => [...prevCities, ...newCities]);
      } catch (error) {
        console.error("Error fetching cities data:", error);
        setError("Failed to fetch cities data. Please try again later.");
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (cityName: string) => {
    if (favorites.includes(cityName)) {
      const updatedFavorites = favorites.filter((fav) => fav !== cityName);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, cityName]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCities(filtered);

    if (searchTerm.trim() !== "") {
      const suggestions = cities.filter((city) =>
        city.name.toLowerCase().startsWith(searchTerm)
      );
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <CityTableWrapper className="CityTableWrapper">
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        className="GetWeatherButton"
        onClick={handleGetCurrentLocationWeather}
      >
        Get Weather for Current Location
      </button>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((city) => (
            <SuggestionItem key={city.geoname_id}>
              <Link to={`/weather/${city.name}`}>{city.name}</Link>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city) => (
            <tr key={city.geoname_id}>
              <td>
                <Link to={`/weather/${city.name}`}>{city.name}</Link>
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
              <td>
                <FavoriteButton
                  onClick={() => toggleFavorite(city.name)}
                  isFavorite={favorites.includes(city.name)}
                >
                  {favorites.includes(city.name) ? "Remove" : "Add"}
                </FavoriteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </CityTableWrapper>
  );
};

export default CityTable;
