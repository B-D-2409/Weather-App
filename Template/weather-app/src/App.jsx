import './App.css';
import WeatherInfo from './components/WeatherInfo/WeatherInfo-File/WeatherInfo';
import Header from './components/WeatherInfo/Header/Header';
import SearchBar from './components/WeatherInfo/SearchBar/SearchBar';
import { useState } from 'react';
import MapView from './components/MapView/MapView';

function App() {
  const [city, setCity] = useState(''); 
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

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
