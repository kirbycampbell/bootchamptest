import React, { useState, useEffect } from "react";
import "./Cities.css";
import { URL } from "./../../constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

const Cities = props => {
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [cityForm, setCityForm] = useState({
    city: "",
    state: ""
  });
  const [cityQuery, setCityQuery] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState("");
  const [selCity, setSelCity] = useState({}); // Replace with props

  // Queries All Cities - Temp Feature
  useEffect(() => {
    axios.get(URL + "cities/").then(function(res) {
      setCityList(res.data);
    });
  }, []);

  // Type into CityName and return Regex Cities
  useEffect(() => {
    if (cityName.length <= 2) {
      setCityQuery([]);
    } else if (cityName.length > 2) {
      axios.get(URL + "cities/matches/" + cityName).then(function(res) {
        setCityQuery(res.data);
      });
    }
  }, [cityName]);

  // Type into State and return Regex Cities
  useEffect(() => {
    if (state.length <= 2) {
      setCityQuery([]);
    } else if (state.length > 2 && cityName.length === 0) {
      axios.get(URL + "cities/state_matches/" + state).then(function(res) {
        setCityQuery(res.data);
      });
    }
  }, [state]);

  // Post Axios Request - Create New City
  useEffect(() => {
    if (cityName.length > 3 && state.length > 2) {
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
    } else if (cityName.length > 0) {
      setError("Enter Proper City & State Name");
    }
  }, [cityForm]);

  // Reset Form and Query List
  const resetForm = () => {
    setCityName("");
    setState("");
    setError("");
    setCityForm({ city: "", state: "" });
  };

  // Error Checks before submitting new City
  const handleForm = e => {
    let found = false;
    e.preventDefault();
    cityList.filter(el => {
      if (
        el.name.toLowerCase() === cityName.toLowerCase() &&
        el.state.toLowerCase() === state.toLocaleLowerCase()
      ) {
        found = true;
      }
      return null;
    });
    if (!found) {
      setCityForm({
        name: cityName,
        state: state
      });
    } else {
      setError("City Already Exists!");
    }
  };

  // Selecting Existing City - Temp - Props call above
  const handleSelect = c => {
    console.log(c);
    setSelCity(c);
  };

  return (
    <div className="Outer-City">
      {/* :::::::::::: City Input Form ::::::::::::: */}
      <form className="city-form">
        <input
          className="input-city"
          type="text"
          placeholder="City"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
          name="city"
          autoComplete="off"
        />
        <input
          className="input-city"
          type="text"
          placeholder="State"
          onChange={e => setState(e.target.value)}
          value={state}
          name="state"
          autoComplete="off"
        />
        <div className="input-citysbm" onClick={handleForm}>
          <i className="fas fa-check check"></i>
          Add
        </div>
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
      {/* :::::::::  Error Message  :::::::::: */}
      {error && <div className="cityError">{error}</div>}
      {/* List of all Cities that Exist in DB - TEMP FEATURE*/}

      <div className="CityList">
        List of All Cities (Temporary Feature):
        <br />
        <br />
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
