import './App.css';
import WeatherInfo from './components/WeatherInfo/WeatherInfo-File/WeatherInfo';
import Header from './components/WeatherInfo/Header/Header';
import SearchBar from './components/WeatherInfo/SearchBar/SearchBar';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');

  const handleSearch = (newCity) => {
    setCity(newCity); 
  }

  return (
    <div className="App-container">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <WeatherInfo city={city} />
    </div>
  );
}

export default App;
