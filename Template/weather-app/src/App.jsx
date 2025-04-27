

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

function App() {
  // State to manage the current city name and its coordinates.
  const [city, setCity] = useState('Plovdiv');
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  /**
   * Handles the city search input by updating the city state.
   * 
   * @param {string} newCity - The name of the city to search for.
   */
  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  /**
   * Handles the weather data by updating the coordinates based on the weather data.
   * 
   * @param {Object} weatherData - The weather data containing coordinates.
   * @param {Object} weatherData.coord - The coordinates of the city (lat, lon).
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
