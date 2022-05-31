import React, { useState } from "react";

const Form = ({ submitSearch }) => {
  const [location, setLocation] = useState("");

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!location || location === "") return;
      submitSearch(location);
      setLocation("");
    }
  };

  return (
    <form className="search" onSubmit={searchLocation}>
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Enter Location"
        type="text"
        onKeyPress={searchLocation}
      />
    </form>
  );
};

export default Form;
