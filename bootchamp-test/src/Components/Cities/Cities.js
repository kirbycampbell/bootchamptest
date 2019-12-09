import React, { useState, useEffect } from 'react'
import './Cities.css'
import {
  getAllCities,
  searchByCityName,
  searchByState,
  createNewCityState
} from '../../API/cities_api'

const Cities = ({ city, setCity, setCityCheck }) => {
  const [cityName, setCityName] = useState('')
  const [state, setState] = useState('')
  const [cityForm, setCityForm] = useState({
    city: '',
    state: ''
  })
  const [cityQuery, setCityQuery] = useState([])
  const [cityList, setCityList] = useState([])
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [selCity, setSelCity] = useState(null) // Replace with props

  // Queries All Cities - Temp Feature
  // useEffect(() => {
  //   if (cityList.length < 2) {
  //     getAllCities().then(res => setCityList(res));
  //   }
  // }, []);

  useEffect(() => {
    setError('')
    setMsg('')
  }, [selCity])

  // Type into CityName and return Regex Cities
  useEffect(() => {
    if (cityName.length <= 2 && state.length <= 2) {
      setCityQuery([])
    } else if (cityName.length > 2) {
      searchByCityName(cityName).then(res => setCityQuery(res))
    } else if (state.length <= 2 && cityName.length === 0) {
      setCityQuery([])
    } else if (
      state.length > 2 &&
      cityName.length === 0 &&
      cityForm.name.length === 0
    ) {
      searchByState(state).then(res => setCityQuery(res))
    }
  }, [cityName, state])

  //  Create New City
  useEffect(() => {
    if (cityName.length > 3 && state.length > 2) {
      createNewCityState(cityName, state).then(function(res) {
        getAllCities().then(res => setCityList(res))
        setMsg('Successfully Created City!')
        setCity(res.data)
        setSelCity(res.data)
        resetForm()
      })
    } else if (cityName.length > 0) {
      setError('Enter Proper City & State Name')
    }
  }, [cityForm])

  // Reset Form and Query List
  const resetForm = () => {
    setCityName('')
    setState('')
    setCityQuery([])
    setCityForm({ city: '', state: '' })
    setError('')
  }

  // Error Checks before submitting new City
  const handleForm = e => {
    let found = false
    let foundCity = {}
    e.preventDefault()
    cityList.filter(el => {
      if (
        el.name.toLowerCase() === cityName.toLowerCase() &&
        el.state.toLowerCase() === state.toLocaleLowerCase()
      ) {
        found = true
        foundCity = el
        resetForm()
      }
      return null
    })
    if (!found) {
      setCityForm({
        name: cityName,
        state: state
      })
    } else {
      setCity(foundCity)
      console.log(city)
      setMsg('Successfully Added!')
      console.log(foundCity)
    }
  }

  // Selecting Existing City - Temp - Props call above
  const handleSelect = c => {
    console.log(c)
    setMsg('Successfully Added!')
    setCity(c)
    setSelCity(c)
    resetForm()
    setCityQuery([])
  }

  return (
    <div className="">
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
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cities
