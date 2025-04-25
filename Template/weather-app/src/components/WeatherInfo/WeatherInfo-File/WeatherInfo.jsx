import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WeatherInfo.css';
function WeatherInfo({ city }) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeatherData = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                setWeatherData(data);
            } else {
                setError('City not found!');
            }
        } catch (error) {
            setError('Failed to fetch weather data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (city) {
            fetchWeatherData();
        }
    }, [city, apiKey]);

    if (loading) {
        return <p>Loading Data... / Type City</p>;
    }
    if (error) return <p>{error}</p>;

    return (
        <div className="weather-info-container"> {/* Apply the container class here */}
            {loading && <p>Loading Data... or Type City</p>}
            {error && <p>{error}</p>}
            {weatherData ? (
                <>
                    <h2>Weather in {city}</h2>
                    <p className="temperature">Temperature: {weatherData.main.temp} °C</p>
                    <p className="description">Description: {weatherData.weather[0].description}</p>
                </>
            ) : (
                <p className="no-data">No data available</p>
            )}
        </div>
    );
}

WeatherInfo.propTypes = {
    city: PropTypes.string.isRequired,
}

export default WeatherInfo;
