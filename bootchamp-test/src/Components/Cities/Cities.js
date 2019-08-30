import React, { useState, useEffect } from "react";
import "./Cities.css";
import CITY_DATA from './Cities.data'

const Cities = () => {

  const [cities, setCities] = useState(CITY_DATA);

  useEffect(() => {
    setCities(CITY_DATA);
  }, []);

  return (
    <div>
      {cities.map(city => {
        return <div key={city}>{city.name}</div>;
      })}
    </div>
  );

}

export default Cities;
