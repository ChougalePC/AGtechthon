import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Droplets, Cloud, CloudLightning, Sunrise, Sunset, AlertCircle, MapPin } from 'lucide-react';

const WeatherIntelligence = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey || apiKey === 'your_openweather_api_key_here') {
        // Fallback to mock data if no key provided
        setTimeout(() => {
          setWeatherData({
            temp: 24,
            feels_like: 26,
            temp_max: 29,
            temp_min: 21,
            humidity: 85,
            wind_speed: 18,
            sunrise: '06:12 AM',
            sunset: '06:48 PM',
            description: 'Heavy Rain Expected',
            icon: '10d',
            location: 'Pune, Maharashtra'
          });
          setLoading(false);
        }, 1000);
        return;
      }

      // Defaulting to Pune for demonstration
      const lat = 18.5204;
      const lon = 73.8567;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      
      const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };

      setWeatherData({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_max: Math.round(data.main.temp_max),
        temp_min: Math.round(data.main.temp_min),
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed * 3.6), // m/s to km/h
        sunrise: formatTime(data.sys.sunrise),
        sunset: formatTime(data.sys.sunset),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        location: `${data.name}, ${data.sys.country}`
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const hourlyForecast = [
    { time: '12 PM', temp: 28, icon: <Sun size={20} className="text-accent" />, drop: 0 },
    { time: '1 PM', temp: 29, icon: <Sun size={20} className="text-accent" />, drop: 10 },
    { time: '2 PM', temp: 28, icon: <Cloud size={20} className="text-[rgba(215,230,190,0.8)]" />, drop: 40 },
    { time: '3 PM', temp: 25, icon: <CloudRain size={20} className="text-[#8cb478]" />, drop: 85 },
    { time: '4 PM', temp: 24, icon: <CloudLightning size={20} className="text-[#8cb478]" />, drop: 90 },
    { time: '5 PM', temp: 23, icon: <CloudRain size={20} className="text-[#8cb478]" />, drop: 60 },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-8 mb-4">
        <div>
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-[rgba(210,230,160,0.65)]">Meteorological Data</span>
          <h1 className="font-serif text-3xl md:text-5xl text-heading mt-2">
            Weather <em className="italic text-accent drop-shadow-[0_0_30px_rgba(230,245,120,0.2)]">Intelligence</em>
          </h1>
        </div>
        <div className="glass-card px-4 py-2 flex items-center gap-2 border-[rgba(180,210,140,0.3)]">
          <MapPin size={14} className="text-accent" />
          <span className="text-xs font-medium text-heading tracking-wide">
            {weatherData ? weatherData.location : 'Loading...'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="lg:col-span-2 glass-card p-8 bg-gradient-to-br from-[rgba(20,35,20,0.4)] to-[rgba(10,15,10,0.6)] relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent opacity-5 rounded-full blur-[80px] group-hover:opacity-10 transition-opacity duration-700"></div>
          
          {loading ? (
            <div className="flex items-center justify-center h-48 relative z-10">
              <div className="w-12 h-12 border-2 border-[rgba(230,245,120,0.2)] border-t-[rgba(230,245,120,0.9)] rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-48 relative z-10 text-[rgba(255,160,140,0.9)]">
              <p>{error}</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative z-10">
              <div className="text-center md:text-left">
                <h2 className="text-7xl md:text-8xl font-serif text-heading drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">{weatherData.temp}<span className="text-4xl text-accent align-top">°C</span></h2>
                <p className="text-xl font-light text-[rgba(215,230,190,0.8)] mt-2 flex items-center justify-center md:justify-start gap-2 capitalize">
                  {weatherData.description.includes('rain') ? <CloudRain size={24} className="text-[#8cb478]" /> : <Sun size={24} className="text-accent" />} 
                  {weatherData.description}
                </p>
                <div className="mt-6 flex gap-6 justify-center md:justify-start">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-1">Feels Like</span>
                    <span className="text-sm font-medium text-heading">{weatherData.feels_like}°C</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label mb-1">High / Low</span>
                    <span className="text-sm font-medium text-heading">{weatherData.temp_max}°C / {weatherData.temp_min}°C</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4 flex items-center gap-3">
                  <Droplets size={20} className="text-accent/70" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label">Humidity</span>
                    <span className="text-sm font-medium text-heading">{weatherData.humidity}%</span>
                  </div>
                </div>
                <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4 flex items-center gap-3">
                  <Wind size={20} className="text-accent/70" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label">Wind</span>
                    <span className="text-sm font-medium text-heading">{weatherData.wind_speed} km/h</span>
                  </div>
                </div>
                <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4 flex items-center gap-3">
                  <Sunrise size={20} className="text-[rgba(250,204,21,0.7)]" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label">Sunrise</span>
                    <span className="text-sm font-medium text-heading">{weatherData.sunrise}</span>
                  </div>
                </div>
                <div className="bg-[rgba(10,15,10,0.4)] border border-[rgba(140,180,120,0.1)] rounded-xl p-4 flex items-center gap-3">
                  <Sunset size={20} className="text-[rgba(250,160,100,0.7)]" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-label">Sunset</span>
                    <span className="text-sm font-medium text-heading">{weatherData.sunset}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-[rgba(140,180,120,0.1)] relative z-10">
            <h3 className="text-[11px] font-medium tracking-[2px] uppercase text-label mb-4">Hourly Forecast</h3>
            <div className="flex justify-between overflow-x-auto custom-scrollbar pb-2 gap-4">
              {hourlyForecast.map((hour, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[60px]">
                  <span className="text-xs text-body mb-2">{hour.time}</span>
                  <div className="mb-2">{hour.icon}</div>
                  <span className="text-sm font-medium text-heading mb-1">{hour.temp}°</span>
                  <div className="flex items-center gap-1 text-[10px] text-[#8cb478]">
                    <Droplets size={10} /> {hour.drop}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 bg-[rgba(180,60,40,0.1)] border-[rgba(220,80,60,0.2)]">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-[rgba(255,160,140,0.9)] w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-[rgba(255,180,160,1)] uppercase tracking-wider mb-1">Weather Alert</h3>
                <p className="text-xs font-light text-[rgba(255,160,140,0.8)] leading-relaxed">
                  Thunderstorms expected between 3 PM and 6 PM. Wind gusts up to 40km/h.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 flex-1 border-[rgba(180,210,140,0.3)] shadow-[0_0_30px_rgba(230,245,120,0.05)]">
            <h3 className="font-serif text-lg text-heading mb-4">Farming Recommendations</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(220,80,60,0.8)] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(220,80,60,0.6)]"></div>
                <div>
                  <h4 className="text-sm font-medium text-heading mb-1">Halt Spraying</h4>
                  <p className="text-xs font-light text-body">Do not apply pesticides or fertilizers today due to high rain probability.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(220,80,60,0.8)] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(220,80,60,0.6)]"></div>
                <div>
                  <h4 className="text-sm font-medium text-heading mb-1">Protect Harvest</h4>
                  <p className="text-xs font-light text-body">Cover any harvested crops left in the open fields immediately.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,245,120,0.6)]"></div>
                <div>
                  <h4 className="text-sm font-medium text-heading mb-1">Drainage Check</h4>
                  <p className="text-xs font-light text-body">Ensure field drainage channels are clear to prevent waterlogging.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherIntelligence;
