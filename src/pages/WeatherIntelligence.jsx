import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Droplets, Cloud, CloudLightning, MapPin, Search, X } from 'lucide-react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const WeatherBackground = ({ condition }) => {
  const isRain = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');
  const isStorm = condition.toLowerCase().includes('thunderstorm') || condition.toLowerCase().includes('storm');
  const isClouds = condition.toLowerCase().includes('cloud');
  const isClear = condition.toLowerCase().includes('clear') || condition.toLowerCase().includes('sun');

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        isClear ? 'bg-gradient-to-br from-[#0a150a] via-[#101a05] to-[#1a2510]' :
        isRain ? 'bg-gradient-to-br from-[#050a10] via-[#0a1015] to-[#05080a]' :
        isStorm ? 'bg-gradient-to-br from-[#020502] via-[#050805] to-[#000000]' :
        'bg-gradient-to-br from-[#0a0f0a] via-[#0f150f] to-[#0a0a0a]'
      }`} />

      {/* Sunny Glow */}
      {isClear && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[rgba(230,245,120,0.15)] blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[rgba(180,210,140,0.08)] blur-[120px] mix-blend-screen" />
        </>
      )}

      {/* Clouds Fog */}
      {isClouds && (
        <>
          <div className="absolute top-[20%] left-[-20%] w-[80vw] h-[40vh] rounded-full bg-[rgba(140,180,120,0.05)] blur-[80px] animate-cloud" style={{ animationDuration: '40s' }} />
          <div className="absolute top-[40%] left-[-10%] w-[70vw] h-[50vh] rounded-full bg-[rgba(200,220,180,0.03)] blur-[100px] animate-cloud" style={{ animationDuration: '60s', animationDelay: '-20s' }} />
        </>
      )}

      {/* Rain Particles */}
      {(isRain || isStorm) && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-[-10%] w-[1px] h-[15vh] bg-gradient-to-b from-transparent via-[rgba(180,210,140,0.3)] to-transparent animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning Flashes */}
      {isStorm && (
        <div className="absolute inset-0 bg-white mix-blend-overlay animate-lightning pointer-events-none" />
      )}

      {/* Subtle Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
};

const MapContainer = ({ lat, lon, onClose }) => {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  useEffect(() => {
    if (map.current) return;
    
    maptilersdk.config.apiKey = 'pl7eAEPD0ivXU5JNn5l9';
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BACKDROP_DARK,
      center: [lon, lat],
      zoom: 10
    });

    new maptilersdk.Marker({ color: "#e6f578" })
      .setLngLat([lon, lat])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lon]);

  return (
    <div className="absolute inset-0 z-50 rounded-[40px] overflow-hidden animate-in zoom-in-95 duration-500">
      <div ref={mapContainer} className="w-full h-full" />
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 z-10 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-black/70 hover:text-[#e6f578] transition-colors cursor-pointer"
      >
        <X size={24} />
      </button>
    </div>
  );
};

const WeatherIntelligence = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);

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
        rain_1h: data.rain ? data.rain['1h'] : 0
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

  const getImpactData = (condition, temp) => {
    const safeCondition = condition ? condition.toLowerCase() : '';
    const isRain = safeCondition.includes('rain');
    const isHot = temp > 35;
    
    return [
      { label: "Spraying Risk", value: isRain ? "HIGH" : "LOW", color: isRain ? "text-red-400" : "text-green-400" },
      { label: "Irrigation Need", value: isRain ? "LOW" : (isHot ? "HIGH" : "MEDIUM"), color: isRain ? "text-green-400" : (isHot ? "text-red-400" : "text-yellow-400") },
      { label: "Disease Risk", value: isRain && temp > 25 ? "HIGH" : "LOW", color: isRain && temp > 25 ? "text-red-400" : "text-green-400" },
      { label: "Harvest Safety", value: isRain ? "POOR" : "OPTIMAL", color: isRain ? "text-red-400" : "text-green-400" }
    ];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-0 bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-[rgba(230,245,120,0.1)] border-t-[rgba(230,245,120,0.8)] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-0 bg-black flex items-center justify-center">
        <p className="text-red-400 text-xl font-light tracking-widest">{error}</p>
      </div>
    );
  }

  const impacts = getImpactData(weatherData.condition, weatherData.temp);

  return (
    <div className="fixed inset-0 z-0 overflow-y-auto overflow-x-hidden bg-black text-white custom-scrollbar">
      <WeatherBackground condition={weatherData.condition} />

      <div className="relative z-10 w-full pt-24 pb-32">
        
        {/* SECTION 1 - IMMERSIVE HERO */}
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h1 
              className="font-serif font-light leading-none tracking-tighter"
              style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
            >
              {weatherData.temp}°
            </h1>
            <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl mt-4 text-[rgba(230,245,120,0.95)] drop-shadow-[0_0_30px_rgba(230,245,120,0.2)] capitalize">
              {weatherData.description}
            </h2>
            <div className="mt-8 flex items-center gap-3 text-[rgba(215,230,190,0.7)] tracking-[4px] uppercase text-sm md:text-lg">
              <MapPin size={18} className="text-accent" />
              <span>{weatherData.location}</span>
              <span className="mx-4 opacity-30">|</span>
              <span>{weatherData.condition} Expected</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 - AGRICULTURAL IMPACT */}
        <section className="px-6 md:px-16 lg:px-24 mt-12">
          <div className="flex overflow-x-auto cinematic-scroll gap-6 md:gap-12 pb-8 animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
            {impacts.map((impact, idx) => (
              <div key={idx} className="min-w-[200px] shrink-0 border-l border-[rgba(230,245,120,0.2)] pl-6 py-2">
                <span className="block text-xs md:text-sm tracking-[3px] uppercase text-[rgba(215,230,190,0.5)] mb-3">{impact.label}</span>
                <span className={`text-3xl md:text-4xl font-light tracking-wider ${impact.color}`}>
                  {impact.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 - AI FARM ADVISOR */}
        <section className="px-6 md:px-16 lg:px-24 py-32 mt-12 bg-gradient-to-b from-transparent to-[rgba(10,18,10,0.6)]">
          <span className="block text-xs tracking-[4px] uppercase text-accent mb-8">AI Recommendation</span>
          <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-snug max-w-5xl text-[rgba(240,250,220,0.9)]">
            {weatherData.condition && weatherData.condition.toLowerCase().includes('rain') 
              ? "Do not spray pesticides today. Heavy rainfall expected. Expected effectiveness reduction: 67%. Protect harvested crops immediately."
              : weatherData.temp > 35 
              ? "Heat stress risk is critical. Increase irrigation cycles by 20% today. Avoid field operations during peak sunlight hours."
              : "Conditions are optimal for standard field operations. Soil moisture is balancing well with current evaporation rates."}
          </p>
        </section>

        {/* SECTION 4 - WEATHER TIMELINE */}
        <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-[rgba(140,180,120,0.1)]">
          <div className="flex overflow-x-auto cinematic-scroll gap-16 md:gap-24 pb-8">
            {/* Mocked 24hr timeline for cinematic effect */}
            {[...Array(8)].map((_, i) => {
              const hour = new Date().getHours() + i;
              const displayHour = hour > 24 ? hour - 24 : hour;
              const ampm = displayHour >= 12 ? 'PM' : 'AM';
              const formatted = `${displayHour > 12 ? displayHour - 12 : (displayHour === 0 ? 12 : displayHour)} ${ampm}`;
              
              return (
                <div key={i} className="flex flex-col items-center shrink-0 group cursor-pointer transition-transform duration-500 hover:-translate-y-4">
                  <span className="text-sm tracking-[2px] text-[rgba(215,230,190,0.5)] mb-8">{formatted}</span>
                  {i % 3 === 0 && weatherData.condition && weatherData.condition.toLowerCase().includes('rain') ? (
                    <CloudRain size={36} className="text-[#8cb478] mb-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                  ) : i % 2 === 0 ? (
                    <Cloud size={36} className="text-[rgba(215,230,190,0.6)] mb-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Sun size={36} className="text-accent mb-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                  )}
                  <span className="text-2xl font-light text-white">{weatherData.temp + (i%3 - 1)}°</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5 - SEVEN DAY OUTLOOK */}
        <section className="px-6 md:px-16 lg:px-24 py-12 max-w-6xl mx-auto">
          <span className="block text-xs tracking-[4px] uppercase text-label mb-12 border-b border-[rgba(140,180,120,0.2)] pb-4">7-Day Outlook</span>
          <div className="flex flex-col">
            {['Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'].map((day, i) => (
              <div key={i} className="flex justify-between items-center py-8 border-b border-[rgba(140,180,120,0.05)] hover:bg-[rgba(140,180,120,0.02)] transition-colors group">
                <span className="text-xl md:text-3xl font-light text-[rgba(240,250,220,0.8)] w-1/3">{day}</span>
                <div className="flex gap-4 w-1/3 justify-center">
                  {i % 4 === 0 ? <CloudRain className="text-[#8cb478]" /> : i % 3 === 0 ? <CloudLightning className="text-yellow-400" /> : <Sun className="text-accent" />}
                </div>
                <div className="w-1/3 flex justify-end gap-6 md:gap-12 text-lg md:text-2xl font-light">
                  <span className="text-white">{weatherData.temp_max || weatherData.temp + 2}°</span>
                  <span className="text-[rgba(215,230,190,0.4)]">{weatherData.temp_min || weatherData.temp - 4}°</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 - AGRICULTURE RISK CENTER */}
        <section className="px-6 md:px-16 lg:px-24 py-24 mt-24 bg-[rgba(10,15,10,0.3)]">
          <span className="block text-xs tracking-[4px] uppercase text-label mb-16">Risk Intelligence</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
            {[
              { label: 'Flood Risk', val: '04', color: 'text-green-400' },
              { label: 'Pest Risk', val: '68', color: 'text-yellow-400' },
              { label: 'Disease Risk', val: '82', color: 'text-red-400' },
              { label: 'Heat Stress', val: '12', color: 'text-green-400' },
            ].map((risk, i) => (
              <div key={i} className="flex flex-col">
                <span className={`text-6xl md:text-8xl font-serif font-light ${risk.color} mb-4 tracking-tighter`}>{risk.val}<span className="text-2xl opacity-50">%</span></span>
                <span className="text-sm tracking-[3px] uppercase text-[rgba(215,230,190,0.5)]">{risk.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7 - WEATHER MAP EXPERIENCE */}
        <section className="px-6 md:px-16 lg:px-24 py-24">
          <div 
            className="w-full h-[60vh] md:h-[80vh] border border-[rgba(140,180,120,0.2)] rounded-[40px] relative overflow-hidden flex items-center justify-center bg-[rgba(10,15,10,0.8)] backdrop-blur-3xl group cursor-crosshair transition-all"
            onClick={() => setShowMap(true)}
          >
            {showMap ? (
              <MapContainer lat={weatherData.lat} lon={weatherData.lon} onClose={() => setShowMap(false)} />
            ) : (
              <>
                {/* Map Placeholder Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(180,210,140,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(180,210,140,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="relative z-10 flex flex-col items-center transition-transform duration-700 group-hover:scale-105">
                  <Search size={48} className="text-accent mb-6 opacity-80" strokeWidth={1} />
                  <h3 className="font-serif text-3xl md:text-5xl text-[rgba(240,250,220,0.9)] mb-4">Command Center</h3>
                  <p className="text-[rgba(215,230,190,0.5)] tracking-[4px] uppercase text-sm">Click to Initialize Interactive Radar</p>
                </div>

                {/* Radar Sweep Effect Placeholder */}
                <div className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 border border-accent/10 rounded-full animate-[spin_10s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(230,245,120,0.1) 100%)' }}></div>
              </>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default WeatherIntelligence;
