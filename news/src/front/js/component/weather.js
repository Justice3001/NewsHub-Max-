// WeatherComponent.js
import React, { useState, useEffect } from 'react';

const API_KEY = '391bc7c99d9a48399f634402232912'; // Replace with your actual API key

const WeatherComponent = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch user's IP address
        const ipResponse = await fetch('https://api64.ipify.org?format=json');

        if (!ipResponse.ok) {
          throw new Error('Error fetching IP address');
        }

        const ipData = await ipResponse.json();
        const userLocation = ipData.ip;

        // Fetch current weather data in Fahrenheit based on user's location
        const currentResponse = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${userLocation}&unit=imperial`
        );

        if (!currentResponse.ok) {
          throw new Error('Error fetching current weather data');
        }

        const currentData = await currentResponse.json();
        setCurrentWeather(currentData);

        // Fetch forecast data in Fahrenheit based on user's location
        const forecastResponse = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${userLocation}&days=5&unit=imperial`
        );

        if (!forecastResponse.ok) {
          throw new Error('Error fetching forecast data');
        }

        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);

        // Fetch city and country information
        const locationResponse = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${userLocation}`
        );

        if (!locationResponse.ok) {
          throw new Error('Error fetching location data');
        }

        const locationData = await locationResponse.json();
        setLocation(locationData[0]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array to ensure it only runs once when mounted

  const handleViewForecast = () => {
    setShowForecast(true);
  };

  const handleHideForecast = () => {
    setShowForecast(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        

        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          <div>

            {/* Display current weather data in a card */}
            <div className="card mx-auto col-md-9 mb-3">
              <div className="card-body text-center">
                <h2 className="card-title">Current Weather</h2>
                <h2 className="card-title">Location: {location?.name}, {location?.country}</h2>
                <p className="card-text">Time Zone: {currentWeather?.location?.tz_id}</p>
                <p className="card-text">Local Time: {new Date(currentWeather?.location?.localtime).toLocaleTimeString('en-US', { hour12: true })}</p>
                <p className="card-text">Temperature: {currentWeather?.current?.temp_f}°F</p>
                <p className="card-text">Condition: {currentWeather?.current?.condition?.text}</p>
                <p className="card-text">Wind Speed: {currentWeather?.current?.wind_mph} mph</p>
                <p className="card-text">Precipitation: {currentWeather?.current?.precip_in} in</p>
                <p className="card-text">Humidity: {currentWeather?.current?.humidity} %</p>
                <p className="card-text">Day/Night: {currentWeather?.current?.is_day ? 'Day' : 'Night'}</p>
                <p className="card-text">Feels Like: {currentWeather?.current?.feelslike_f}°F</p>
                <p className="card-text">Last Updated: {new Date(currentWeather?.current?.last_updated).toLocaleTimeString('en-US', { hour12: true })}</p>
                <button className="btn btn-primary" onClick={handleViewForecast}>
                  View Forecast
                </button>
              </div>
            </div>

            {/* Display forecast data if showForecast is true */}
            {showForecast && (
              <div>
                <h2>5-Day Forecast</h2>
                <div className="row">
                  {forecastData?.forecast?.forecastday.map((day) => (
                    <div key={day.date} className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{day.date}</h5>
                          <p className="card-text">Max Temperature: {day.day?.maxtemp_f}°F</p>
                          <p className="card-text">Min Temperature: {day.day?.mintemp_f}°F</p>
                          {/* Add more forecast details as needed */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-secondary" onClick={handleHideForecast}>
                  Hide Forecast
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
