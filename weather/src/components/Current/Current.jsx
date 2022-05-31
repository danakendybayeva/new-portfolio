import { useState, useEffect } from "react";
import { cityDate, autoChangeMode } from "../../helpers/aboutTime";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { MdLocationOn } from "react-icons/md";
import { getIcon } from "../../helpers/aboutWeather";

const Current = ({ data }) => {
  const [cTime, setCTime] = useState();

  function updateTime() {
    setCTime(
      cityDate(data.newRes.timezone_offset).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  useEffect(() => {
    updateTime();
    autoChangeMode(cityDate(data.newRes.timezone_offset).getHours());

    const inter = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      clearInterval(inter);
    };
  }, [data]);

  const { weatherIcon, weatherIconNight } = getIcon(
    data.newRes.current.weather[0].main
  );
  // const urlCountry = `https://countryflagsapi.com/svg/kr/${data.flag}`
  // console.log(data.flag);

  return (
    <div className="currentDay">
      <div className="nameTime">
        <div className="cityName">
          <div className="text">
            <MdLocationOn /> {data.cityName}
          </div>
          <img src={data.flag} alt="flag" className="flag" />
        </div>
        <div className="cityTime">{cTime}</div>
      </div>
      <div className="tempDesc">
        <div className="temp">{data.newRes.current.temp.toFixed()}°</div>
        <div className="desc">{data.newRes.current.weather[0].main}</div>
        <div className="icon">
          {document.body.classList.contains("dark-mode") &&
          weatherIconNight !== null
            ? weatherIconNight
            : weatherIcon}
        </div>
      </div>
      <div className="humWind">
        <div className="humWind__item">
          <WiHumidity /> {data.newRes.current.humidity}%
        </div>
        <div className="humWind__item">
          <WiStrongWind /> {data.newRes.current.wind_speed.toFixed()} km/h
        </div>
      </div>
    </div>
  );
};

export default Current;
