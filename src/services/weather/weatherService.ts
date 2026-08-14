import { WeatherReading } from '../../types';

export const fetchWeatherTelemetry = async (lat: number, lng: number): Promise<WeatherReading> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        return {
          timestamp: new Date().toISOString(),
          temperature: Math.round(data.main.temp * 10) / 10,
          rainfall: data.rain ? data.rain['1h'] || 0 : 0,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6 * 10) / 10,
          pressure: data.main.pressure,
          forecast7Days: [
            { day: 'Today', rainfall: 12, tempMax: 33, tempMin: 24 },
            { day: 'Tue', rainfall: 18, tempMax: 32, tempMin: 25 },
            { day: 'Wed', rainfall: 8, tempMax: 34, tempMin: 25 },
            { day: 'Thu', rainfall: 2, tempMax: 35, tempMin: 26 },
            { day: 'Fri', rainfall: 0, tempMax: 36, tempMin: 26 },
            { day: 'Sat', rainfall: 4, tempMax: 34, tempMin: 25 },
            { day: 'Sun', rainfall: 2, tempMax: 35, tempMin: 25 },
          ],
        };
      }
    } catch (e) {
      console.warn('OpenWeather API fallback to mock weather data:', e);
    }
  }

  // Demo fallback weather reading
  return {
    timestamp: new Date().toISOString(),
    temperature: 32.4,
    rainfall: 46.0,
    humidity: 74,
    windSpeed: 14.2,
    pressure: 1012,
    forecast7Days: [
      { day: 'Mon', rainfall: 12, tempMax: 33, tempMin: 24 },
      { day: 'Tue', rainfall: 18, tempMax: 32, tempMin: 25 },
      { day: 'Wed', rainfall: 8, tempMax: 34, tempMin: 25 },
      { day: 'Thu', rainfall: 2, tempMax: 35, tempMin: 26 },
      { day: 'Fri', rainfall: 0, tempMax: 36, tempMin: 26 },
      { day: 'Sat', rainfall: 4, tempMax: 34, tempMin: 25 },
      { day: 'Sun', rainfall: 2, tempMax: 35, tempMin: 25 },
    ],
  };
};
