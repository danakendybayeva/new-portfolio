import {
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiDayRain,
  WiNightAltRain,
  WiDaySnowWind,
  WiNightAltSnowWind,
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiTornado,
  WiDayFog,
  WiNightFog,
  WiDust,
  WiDayHaze,
  WiVolcano,
} from "react-icons/wi";

export const getIcon = (name) => {
  var weatherIcon = null,
    weatherIconNight = null;

  switch (name) {
    case "Thunderstorm":
      weatherIcon = <WiDayThunderstorm />;
      weatherIconNight = <WiNightAltThunderstorm />;
      break;
    case "Drizzle":
    case "Squall":
    case "Rain":
      weatherIcon = <WiDayRain />;
      weatherIconNight = <WiNightAltRain />;
      break;
    case "Snow":
      weatherIcon = <WiDaySnowWind />;
      weatherIconNight = <WiNightAltSnowWind />;
      break;
    case "Clear":
      weatherIcon = <WiDaySunny />;
      weatherIconNight = <WiNightClear />;
      break;
    case "Clouds":
      weatherIcon = <WiDayCloudy />;
      weatherIconNight = <WiNightAltCloudy />;
      break;
    case "Tornado":
      weatherIcon = <WiTornado />;
      break;
    case "Mist":
    case "Fog":
      weatherIcon = <WiDayFog />;
      weatherIconNight = <WiNightFog />;
      break;
    case "Dust":
    case "Sand":
      weatherIcon = <WiDust />;
      break;
    case "Haze":
    case "Smoke":
      weatherIcon = <WiDayHaze />;
      break;
    case "Ash":
      weatherIcon = <WiVolcano />;
      break;
    default:
      weatherIcon = null;
  }

  return {
    weatherIcon,
    weatherIconNight,
  };
};
