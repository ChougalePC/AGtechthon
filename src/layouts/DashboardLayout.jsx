import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import WeatherBackground from '../components/WeatherBackground';
import { useAuth } from '../context/AuthContext';
import { getCoordinates, getWeatherData } from '../utils/weatherApi';

const DashboardLayout = () => {
  const { userProfile } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (lat, lon, locName) => {
    try {
      // Using Open-Meteo API from our utility
      const data = await getWeatherData(lat, lon);
      if (!data) throw new Error('Failed to fetch weather data');
      
      const current = data.current;
      const wCode = current.weather_code;
      
      // Map WMO codes to OpenWeather strings for background component compatibility
      let cond = 'Clear';
      if (wCode >= 50 && wCode <= 69) cond = 'Rain';
      else if (wCode >= 70 && wCode <= 79) cond = 'Snow';
      else if (wCode >= 80 && wCode <= 99) cond = 'Rain';
      else if (wCode >= 1 && wCode <= 3) cond = 'Clouds';

      setWeatherData({
        lat: lat,
        lon: lon,
        temp: Math.round(current.temperature_2m),
        condition: cond,
        description: cond === 'Clear' ? 'Clear Sky' : cond === 'Rain' ? 'Rainy' : 'Cloudy',
        location: locName || "Your Farm",
        humidity: current.relative_humidity_2m,
        wind_speed: current.wind_speed_10m,
        rain_1h: current.precipitation || 0,
        temp_max: Math.round(data.daily?.temperature_2m_max?.[0] || current.temperature_2m + 3),
        temp_min: Math.round(data.daily?.temperature_2m_min?.[0] || current.temperature_2m - 3)
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getUserLocation = async () => {
    setLoading(true);
    
    // Prioritize User Profile Location
    if (userProfile && userProfile.location) {
      const coords = await getCoordinates(userProfile.location);
      if (coords) {
        return fetchWeather(coords.lat, coords.lon, coords.name);
      }
    }

    // Fallback to Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, "Current Location");
        },
        (error) => {
          console.error("Error getting location, falling back to default:", error);
          fetchWeather(18.5204, 73.8567, "Pune, India"); // Fallback to Pune
        }
      );
    } else {
      fetchWeather(18.5204, 73.8567, "Pune, India");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [userProfile?.location]); // Refetch if profile location changes

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
