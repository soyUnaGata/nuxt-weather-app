import axios from "axios";

const API_KEY = "2e65091681075a7c367751f17ff53212";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const FORECAST_KEY = "9394ab08719300551ef6070c2f9415cc";

class ForecastService {
  async getForecast(city) {
    const url = `${FORECAST_URL}${city}&appid=${API_KEY}&units=imperial`;
    return await axios
      .get(url)
      .then((response) => response.data)
      .then((info) => {
        if (!info) return [];
        console.log(info);
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
      });
  }
}

export default new ForecastService();