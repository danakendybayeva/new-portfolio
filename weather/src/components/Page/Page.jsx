import React, { Fragment } from "react";

import Form from "../Form";
import Error from "../Error";

import useForecast from "../../helpers/useForecast";
import Forecast from "../Forecast/Forecast";

const Page = () => {
  const { isError, submitRequest, forecast } = useForecast();

  const searchLocation = (value) => {
    submitRequest(value);
  };

  return (
    <Fragment>
      <Form submitSearch={searchLocation} />
      {isError && <Error message={isError} />}
      {!isError && forecast && (
        <Forecast
          forCurrent={forecast}
          forHourly={forecast.newRes.hourly}
          forDaily={forecast.newRes.daily}
        />
      )}
    </Fragment>
  );
};

export default Page;
