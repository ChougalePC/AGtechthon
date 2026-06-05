// Free Open-Meteo API doesn't require an API key
export const getCoordinates = async (locationStr) => {
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationStr)}&count=1`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return { lat: data.results[0].latitude, lon: data.results[0].longitude, name: data.results[0].name };
    }
    return null;
  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
};

export const getWeatherData = async (lat, lon) => {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return null;
  }
};
