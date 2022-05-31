import { useState } from "react";
import axios from "axios";

const API_KEY = "8ed7ed82bb3ca96f77548f14f9ebf111";
const urlLatLon = "https://api.openweathermap.org/geo/1.0/direct";
const base_url = "https://api.openweathermap.org/data/2.5/weather";
const base_url2 = "https://api.openweathermap.org/data/2.5/onecall";
// const urlHourly = `${base_url}forecast?q=${location}&appid=${API_KEY}&units=metric`;
// const urlDaily = `${base_url}onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}&units=metric`;
// const urlCountry = `https://countryflagsapi.com/svg/kr`

const useForecast = () => {
  const [isError, setError] = useState(false);
  const [forecast, setForecast] = useState();

  const getLocation = async (location) => {
    try {
      const response = await axios(urlLatLon, {
        params: { q: location, limit: 5, appid: API_KEY },
      }).then((res) => {
        const lat = res.data[0].lat,
          lon = res.data[0].lon,
          name = res.data[0].name,
          country = res.data[0].country;
        return [lat, lon, name, country];
      });
      if (!response || response === 0) {
        setError("There is no such location");
        return;
      }
      return response;
    } catch {
      setError("Something went wrong in finding location");
    }
  };

  const getWeatherLan = async (lat, lon) => {
    try {
      const { data } = await axios(base_url2, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: "metric",
        },
      });

      if (!data || data === 0) {
        setError("here");
        return;
      }

      return data;
    } catch {
      setError("Something went wrong");
    }
  };

  const getWeatherData = async (location) => {
    try {
      const { data } = await axios(base_url, {
        params: { q: location, appid: API_KEY, units: "metric" },
      });

      if (!data || data === 0) {
        // setError("There is no such location");
        return;
      }

      return data;
    } catch {
      setError("There is no such location");
    }
  };

  const submitRequest = async (location) => {
    setError(false);

    const data = await getWeatherData(location);
    if (!data) return;

    const coord = await getLocation(location);
    if (!coord) return;
    const cityName = coord[2] + ", " + coord[3];

    const newRes = await getWeatherLan(coord[0], coord[1]);
    if (!newRes) return;

    const flag = "https://countryflagsapi.com/svg/" + coord[3];

    setForecast({ newRes, cityName, flag });
  };

  return {
    isError,
    submitRequest,
    forecast,
  };
};

export default useForecast;
