import React, { useEffect } from "react";

const CityResource = ({ city, setCity, cities }) => {
  useEffect(() => {
    if (cities.name) {
      setCity(cities);
    }
  }, [cities]);
  return (
    <div className="has-text-centered">
      {cities ? cities.name + " , " + cities.state : null}
    </div>
  );
};

export default CityResource;
