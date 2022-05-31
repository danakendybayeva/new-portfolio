import Current from "../Current/Current";
import Hourly from "../Hourly";
import Daily from "../Daily";

const Forecast = ({ forCurrent, forHourly, forDaily }) => {
  return (
    <div className="forecast">
      <Current data={forCurrent} />
      <Hourly data={forHourly} />
      <Daily data={forDaily} />
    </div>
  );
};

export default Forecast;
