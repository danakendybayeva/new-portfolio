import { getIcon } from "../../helpers/aboutWeather";

const Daily = ({ data }) => {
  // console.log(data);
  return (
    <div className="daily">
      {data.slice(1).map((day) => {
        const { weatherIcon, weatherIconNight } = getIcon(day.weather[0].main);
        const { weekDay, full } = getDayName(day.dt);
        return (
          <div className="day" key={day.dt}>
            <div className="day__date">
              <p className="weekDay">{weekDay}</p>
              <p className="full">{full}</p>
            </div>
            <div className="day__temp">
              <p>{day.temp.day.toFixed()}°</p>
            </div>
            <div className="day__icon">
              {document.body.classList.contains("dark-mode") &&
              weatherIconNight !== null
                ? weatherIconNight
                : weatherIcon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function getDayName(time) {
  var date = new Date(time * 1000);

  const weekDay = date.toLocaleDateString("en-us", {
    weekday: "long",
  });
  const day = date.toLocaleDateString("en-us", {
    day: "numeric",
  });
  const month = date.toLocaleDateString("en-us", {
    month: "short",
  });
  const full = day + " " + month;
  // var day = date.getDay();
  return { weekDay, full };
}

export default Daily;
