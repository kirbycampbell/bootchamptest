import React, { useState, useEffect } from "react";
import "./Cities.css";
import { URL } from "./../../constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

const Cities = () => {
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [cityForm, setCityForm] = useState({
    city: "",
    state: ""
  });
  const [cityQuery, setCityQuery] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(URL + "cities/").then(function(res) {
      console.log(res.data);
      setCityList(res.data);
    });
  }, []);

  useEffect(() => {
    if (cityName.length <= 2) {
      setCityQuery([]);
    } else if (cityName.length > 2) {
      axios.get(URL + "cities/matches/" + cityName).then(function(res) {
        console.log(res.data);
        setCityQuery(res.data);
      });
    }
  }, [cityName]);

  useEffect(() => {
    if (cityName.length > 3) {
      axios
        .post(URL + "cities/", {
          id: uuidv1(),
          name: cityName,
          state: state
        })
        .then(function(res) {
          axios.get(URL + "cities/").then(function(res) {
            console.log(res.data);
            setCityList(res.data);
          });
          resetForm();
        });
    }
  }, [cityForm]);

  const resetForm = () => {
    setCityName("");
    setState("");
    setCityForm({ city: "", state: "" });
  };

  const handleForm = e => {
    let found = false;
    e.preventDefault();
    cityList.filter(el => {
      if (
        el.name.toLowerCase() === cityName.toLowerCase() &&
        el.state.toLowerCase() === state.toLocaleLowerCase()
      ) {
        console.log("Already Exists!");
        found = true;
      }
      return null;
    });
    if (!found) {
      setCityForm({
        name: e.target.city.value,
        state: e.target.state.value
      });
    } else {
      setError("City Already Exists!");
      console.log("City Already Exists");
    }
  };

  const handleSelect = c => {
    console.log(c);
  };

  return (
    <div className="Outer-City">
      <form className="city-form" onSubmit={handleForm}>
        <input
          className="input-city"
          type="text"
          placeholder="City"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
          name="city"
        />
        <input
          className="input-city"
          type="text"
          placeholder="State"
          onChange={e => setState(e.target.value)}
          value={state}
          name="state"
        />
        <input className="input-citysbm" type="submit" value="submit" />
      </form>

      {/* ::::::::::: List of Search Matches :::::::::::::: */}
      <div className="Tag-Results">
        {cityQuery.length > 0 && (
          <div className="Tag-search-results">
            {cityQuery.map(c => {
              return (
                <div
                  className="ind-result"
                  key={c.id}
                  onClick={() => handleSelect(c)}
                >
                  {c.name.charAt(0).toUpperCase() + c.name.slice(1)} - {c.state}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* List of all Cities that Exist in DB */}
      <div className="CityList">
        {cityList.map(city => {
          return (
            <div key={city.id}>
              {city.name} - {city.state}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cities;
