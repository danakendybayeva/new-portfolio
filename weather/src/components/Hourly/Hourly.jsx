import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";

import { getIcon } from "../../helpers/aboutWeather";

const Hourly = ({ data }) => {
  const hours = data.slice(0, 24);

  return (
    <div className="hourly">
      <Swiper
        direction={"horizontal"}
        slidesPerView={4}
        spaceBetween={20}
        mousewheel={true}
        modules={[Mousewheel]}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper"
      >
        {hours.map((hour) => {
          const { weatherIcon, weatherIconNight } = getIcon(
            hour.weather[0].main
          );
          return (
            <SwiperSlide key={hour.dt} className="mySlide">
              <p>{getTime(hour.dt)}</p>
              <div className="icon">
                {document.body.classList.contains("dark-mode") &&
                weatherIconNight !== null
                  ? weatherIconNight
                  : weatherIcon}
              </div>
              <p>{hour.temp.toFixed()}°</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var hour = date.getHours();
  var AmOrPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  var finalTime = hour + " " + AmOrPm;
  return finalTime;
}

export default Hourly;
