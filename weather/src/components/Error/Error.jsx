import React from "react";
import PropTypes from "prop-types";

const Error = ({ message }) => <div className="error">{message}</div>;

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: "An error occurred",
};

export default Error;
