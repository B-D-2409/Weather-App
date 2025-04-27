

/**
 * Main App component that manages the city and weather data for the application.
 * Displays the header, search bar, weather information, and a map view.
 *
 * @component
 * @returns {JSX.Element} The main container for the weather app.
 */
import './App.css';
import WeatherInfo from './components/WeatherInfo/WeatherInfo-File/WeatherInfo';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';
import MapView from './components/MapView/MapView';

function App() {
  // State to manage the current city name.
  const [city, setCity] = useState('Plovdiv');
  // State to manage the current coordinates for the map.
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  /**
   * Updates the current city when a new search is performed.
   *
   * @param {string} newCity - The name of the city to search for.
   */
  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  /**
   * Receives weather data and updates the map coordinates.
   *
   * @param {Object} weatherData - The weather data object returned from the API.
   * @param {Object} weatherData.coord - The coordinates of the city.
   * @param {number} weatherData.coord.lat - Latitude of the city.
   * @param {number} weatherData.coord.lon - Longitude of the city.
   */
  const handleWeatherData = (weatherData) => {
    if (weatherData?.coord) {
      setCoordinates({
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
      });
    }
  };

  return (
    <div className="App-container">
      <div className="top-bar">
        <Header />
        <SearchBar onSearch={handleSearch} />
      </div>

      {city && (
        <div className="main-content">
          <div className="map-container">
            {coordinates.lat && coordinates.lon && (
              <MapView lat={coordinates.lat} lon={coordinates.lon} />
            )}
          </div>
          <div className="weather-container">
            <WeatherInfo city={city} onWeatherData={handleWeatherData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
