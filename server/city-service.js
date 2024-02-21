import axios from "axios";

const API_KEY = "2e65091681075a7c367751f17ff53212";
const CITY_URL = "https://api.openweathermap.org/geo/1.0/direct?q=";
const COORD_URL = "https://api.openweathermap.org/data/2.5/weather?";

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

  async getCityInfoByCoord(lat, lon) {
    const url = `${COORD_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    return await axios
      .get(url)
      .then((response) => response.data)
      .then((info) => {
        if (!info) return [];
        const city = info;
        return {
          city: city.name,
          country: city.sys.country,
        };
      })
      .catch((err) => null);
  }
}

export default new CityService();
