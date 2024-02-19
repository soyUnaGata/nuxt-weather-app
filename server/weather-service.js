import axios from "axios";

const API_KEY = "2e65091681075a7c367751f17ff53212";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

class ForecastService {
  async getForecast(city) {
    const url = `${FORECAST_URL}${city}&appid=${API_KEY}&units=imperial`;
    return await axios
      .get(url)
      .then((response) => response.data)
      .then((info) => {
        if (!info) return [];
        const forecast = info;
        return {
          country: forecast.city.country,
          id: forecast.city.id,
          city: forecast.city.name,
          sunrize: forecast.city.sunrise,
          sunset: forecast.city.sunset,
          timezone: forecast.city.timezone,
          details: forecast.list,
        };
      })
      .catch((err) => null);
  }

  async getWeather(city, country) {
    const url = `${WEATHER_URL}${city},${country}&appid=${API_KEY}&units=imperial`;
    return await axios
      .get(url)
      .then((response) => response.data)
      .then((info) => {
        if (!info) return [];
        const weather = info;
        return {
          id: weather.id,
          dt: weather.dt,
          humidity: weather.main.humidity,
          pressure: weather.main.pressure,
          temp: weather.main.temp,
          city: weather.name,
          country: weather.sys.country,
          sunrise: weather.sys.sunrise,
          sunset: weather.sys.sunset,
          timezone: weather.timezone,
          weather: weather.weather[0].description,
          winds: {
            speed: weather.wind.speed,
            deg: weather.wind.deg,
          },
        };
      })
      .catch((err) => null);
  }
}

export default new ForecastService();
