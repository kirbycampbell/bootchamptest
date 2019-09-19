import React, {useState, useEffect} from 'react';
import './Cities.css';
import {URL} from './../../constants/url';
const axios = require('axios');
const uuidv1 = require('uuid/v1');

const Cities = ({city, setCity, setCityCheck}) => {
  const [cityName, setCityName] = useState('');
  const [state, setState] = useState('');
  const [cityForm, setCityForm] = useState({
    city: '',
    state: '',
  });
  const [cityQuery, setCityQuery] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [selCity, setSelCity] = useState(null); // Replace with props

  // Queries All Cities - Temp Feature
  useEffect(() => {
    if (cityList.length < 2) {
      axios.get(URL + 'cities/').then(function(res) {
        let sortedCities = res.data.sort(sortByState);
        setCityList(sortedCities);
      });
    }
  }, []);

  useEffect(() => {
    setError('');
    setMsg('');
  }, [selCity]);

  // Sorting Methods
  function sortByState(a, b) {
    const stateA = a.state.toUpperCase();
    const stateB = b.state.toUpperCase();
    let comparison = 0;
    stateA > stateB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }
  function sortByCity(a, b) {
    const cityA = a.name.toUpperCase();
    const cityB = b.name.toUpperCase();
    let comparison = 0;
    cityA > cityB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  // Type into CityName and return Regex Cities
  useEffect(() => {
    if (cityName.length <= 2) {
      setCityQuery([]);
    } else if (cityName.length > 2) {
      axios.get(URL + 'cities/matches/' + cityName).then(function(res) {
        let sortedQuery = res.data.sort(sortByState);
        setCityQuery(sortedQuery);
      });
    }
  }, [cityName]);

  // Type into State and return Regex Cities
  useEffect(() => {
    if (state.length <= 2 && cityName.length === 0) {
      setCityQuery([]);
    } else if (state.length > 2 && cityName.length === 0) {
      axios.get(URL + 'cities/state_matches/' + state).then(function(res) {
        let sortedCities = res.data.sort(sortByCity);
        setCityQuery(sortedCities);
      });
    }
  }, [state]);

  // Post Axios Request - Create New City
  useEffect(() => {
    if (cityName.length > 3 && state.length > 2) {
      axios
        .post(URL + 'cities/', {
          id: uuidv1(),
          name: cityName,
          state: state,
        })
        .then(function(res) {
          axios.get(URL + 'cities/').then(function(resp) {
            let sortedCities = resp.data.sort(sortByState);
            setCityList(sortedCities);
          });
          setMsg('Successfully Created City!');
          setCity(res.data);
          setSelCity(res.data);
          console.log(res.data);
          resetForm();
        });
    } else if (cityName.length > 0) {
      setError('Enter Proper City & State Name');
    }
  }, [cityForm]);

  // Reset Form and Query List
  const resetForm = () => {
    setCityName('');
    setState('');
    setError('');
    setCityForm({city: '', state: ''});
  };

  // Error Checks before submitting new City
  const handleForm = e => {
    let found = false;
    let foundCity = {};
    e.preventDefault();
    cityList.filter(el => {
      if (
        el.name.toLowerCase() === cityName.toLowerCase() &&
        el.state.toLowerCase() === state.toLocaleLowerCase()
      ) {
        found = true;
        foundCity = el;
        resetForm();
      }
      return null;
    });
    if (!found) {
      setCityForm({
        name: cityName,
        state: state,
      });
    } else {
      setCity(foundCity);
      console.log(city);
      setMsg('Successfully Added!');
      console.log(foundCity);
    }
  };

  // Selecting Existing City - Temp - Props call above
  const handleSelect = c => {
    console.log(c);
    setMsg('Successfully Added!');
    setCity(c);
    setSelCity(c);
    resetForm();
  };

  return (
    <div className="Outer-City">
      {/* :::::::::::: City Input Form ::::::::::::: */}
      {!selCity && (
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
          {cityName.length === 0 && setCityCheck ? (
            <div className="input-citysbm" onClick={() => setCityCheck(false)}>
              <i className="fas fa-check check"></i>
              Cancel
            </div>
          ) : (
            <div className="input-citysbm" onClick={handleForm}>
              <i className="fas fa-check check"></i>
              Add
            </div>
          )}
        </form>
      )}
      {selCity && (
        <div className="chosen-city">
          <div>
            {selCity.name}, {selCity.state}
          </div>
          <div className="x-out" onClick={e => setSelCity(null)}>
            <i className="far fa-times-circle iconb" />
          </div>
        </div>
      )}

      {error && <div className="citymsg error">{error}</div>}
      {msg && <div className="citymsg">{msg}</div>}

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

      {/* List of all Cities that Exist in DB - TEMP FEATURE*/}

      {/* <div className="CityList">
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
      </div> */}
    </div>
  );
};

export default Cities;
