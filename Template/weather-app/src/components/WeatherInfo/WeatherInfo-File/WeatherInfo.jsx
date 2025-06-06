// src/components/WeatherInfo/WeatherInfo.jsx

/**
 * WeatherInfo component fetches and displays current weather and a 5-day forecast
 * for a given city, and renders a map at the city’s coordinates.
 *
 * @component
 * @param {Object} props
 * @param {string} props.city – The name of the city to fetch weather for.
 * @returns {JSX.Element}
 */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./WeatherInfo.css";
import MapView from "../../MapView/MapView";

function WeatherInfo({ city }) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiKeyWeather = import.meta.env.VITE_WEATHER_API_KEY;
    const apiKeyForeCast = import.meta.env.VITE_WEATHER_API_KEY_FORECAST;

    /**
     * Fetch current weather data for the specified city.
     *
     * @async
     * @param {string} city – City name to query.
     * @returns {Promise<Object|null>} The weather data object or null if failed.
     */
    const fetchWeatherData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching current weather:", error);
            return null;
        }
    };

    /**
     * Fetch 5-day forecast data for given coordinates.
     *
     * @async
     * @param {number} lat – Latitude.
     * @param {number} lon – Longitude.
     * @returns {Promise<Object|null>} The forecast data object or null if failed.
     */
    const fetchForecastData = async (lat, lon) => {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyForeCast}&units=metric`;
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            if (data.cod === "200") {
                return data;
            } else {
                console.error("Error fetching forecast data:", data.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching forecast:", error);
            return null;
        }
    };

    useEffect(() => {
        if (!city) return;

        const fetchData = async () => {
            setLoading(true);
            const currentWeather = await fetchWeatherData(city);
            setWeatherData(currentWeather);

            if (currentWeather?.coord) {
                const { lat, lon } = currentWeather.coord;
                const forecast = await fetchForecastData(lat, lon);
                setForecastData(forecast);
            }

            setLoading(false);
        };

        fetchData();
    }, [city]);

    if (loading) {
        return <p className="loading-text">Loading... / Type City or country</p>;
    }

    

    return (
        <div className="weather-and-map-wrapper">
            {weatherData?.coord && (
                <div className="map-container">
                    <MapView lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
                </div>
            )}

            <div className="additional-info-container">
                <h3>Additional Weather Info</h3>
                <div className="additional-info-grid">
                    <div className="info-row">
                        <span>Humidity:</span>
                        <span>{weatherData?.main?.humidity ?? "N/A"}%</span>
                    </div>
                    <div className="info-row">
                        <span>Wind Speed:</span>
                        <span>{weatherData?.wind?.speed ?? "N/A"} m/s</span>
                    </div>
                    <div className="info-row">
                        <span>Pressure:</span>
                        <span>{weatherData?.main?.pressure ?? "N/A"} hPa</span>
                    </div>
                    <div className="info-row">
                        <span>Feels Like:</span>
                        <span>{weatherData?.main?.feels_like ?? "N/A"} °C</span>
                    </div>
                </div>
            </div>

            <div className="weather-info-container">
                {weatherData ? (
                    <>
                        <h2>Weather in {city}</h2>

                        <div className="info-row-weather">
                            <span>Temperature:</span>
                            <span>{weatherData.main.temp} °C</span>
                        </div>

                        <div className="info-row-weather">
                            <span>Description:</span>
                            <span>{weatherData.weather[0].description}</span>
                        </div>

                        <div className="forecast">
                            <h2>5-DAY WEATHER FORECAST WITH 3-HOUR INTERVAL UPDATES</h2>
                            <div className="forecast-grid">
                                {forecastData?.list?.map((forecast, index) => (
                                    <div key={index} className="forecast-item">
                                        <p>
                                            {new Date(forecast.dt * 1000).toLocaleString()}
                                        </p>
                                        <p>Temp: {forecast.main.temp}°C</p>
                                        <p>{forecast.weather[0].description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}

WeatherInfo.propTypes = {
    /** The city for which to display weather info */
    city: PropTypes.string.isRequired,
};

export default WeatherInfo;
