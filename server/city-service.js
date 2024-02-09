import axios from "axios";

const API_KEY = "2e65091681075a7c367751f17ff53212";
const CITY_URL = "http://api.openweathermap.org/geo/1.0/direct?q=";

class CityService {
  async getCityInfo(city) {
    const url = `${CITY_URL}${city}&limit=10&appid=${API_KEY}`;
    return await axios
      .get(url)
      .then((response) => response.data)
      .then((info) => {
        if (!info) return [];
        const cityInfo = info.map((city) => ({
          city: city.name,
          country: city.country,
          state: city.state,
        }));

        const uniqueCityInfo = Array.from(
          new Set(cityInfo.map(JSON.stringify))
        ).map(JSON.parse);

        return uniqueCityInfo;
      })
      .catch((err) => null);
  }
}

export default new CityService();
