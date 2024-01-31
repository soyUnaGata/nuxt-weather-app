const API_KEY = "2e65091681075a7c367751f17ff53212";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

class ForecastService {
  async getForecast(city) {
    const url = `${FORECAST_URL}${city}&appid=${API_KEY}&units=imperial`;
    return await api
      .get(url)
      .then((response) => response.data)
      .then((info) => {
        if (!info) return [];
        return info.map((forecast) => ({
          dt: forecast.dt,
          id: forecast.id,
          main: forecast.main,
          city: forecast.name,
          about: forecast.sys,
          timezone: forecast.timezone,
          weather: forecast.weather,
          wind: forecast.wind,
        }));
      });
  }
}
