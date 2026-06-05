import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import WeatherBackground from '../components/WeatherBackground';

const DashboardLayout = () => {
  const location = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (lat = 18.5204, lon = 73.8567) => {
    try {
      const apiKey = "bd5e378503939ddaee76f12ad7a97608";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      
      setWeatherData({
        lat: lat,
        lon: lon,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        location: `${data.name}, ${data.sys.country}`,
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed * 3.6),
        rain_1h: data.rain ? data.rain['1h'] : 0,
        temp_max: Math.round(data.main.temp_max),
        temp_min: Math.round(data.main.temp_min)
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location, falling back to default:", error);
          fetchWeather(); // Fallback to Pune
        }
      );
    } else {
      fetchWeather();
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Global Weather Background */}
      <WeatherBackground condition={weatherData?.condition || ''} />

      {/* Navigation (z-index 50) */}
      <Navigation />

      {/* Main Content (z-index 10) */}
      <div className="relative z-10 w-full h-screen overflow-y-auto pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto min-h-full">
          <Outlet context={{ weatherData, loading, error }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
