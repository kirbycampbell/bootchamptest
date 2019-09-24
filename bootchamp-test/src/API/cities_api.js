import { URL } from "../Variable_Constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

export async function getAllCities() {
  return await axios.get(URL + "cities/").then(res => {
    let sortedCities = res.data.sort(sortByState);
    return sortedCities;
  });
}

export async function searchByCityName(cityName) {
  return await axios.get(URL + "cities/matches/" + cityName).then(res => {
    let sortedQuery = res.data.sort(sortByState);
    return sortedQuery;
  });
}

export async function searchByState(state) {
  return await axios.get(URL + "cities/state_matches/" + state).then(res => {
    let sortedQuery = res.data.sort(sortByState);
    return sortedQuery;
  });
}

export async function createNewCityState(city, state) {
  return await axios
    .post(URL + "cities/", {
      id: uuidv1(),
      name: city,
      state: state
    })
    .then(res => res);
}

// Internal Sorting Methods
function sortByState(a, b) {
  const stateA = a.state.toUpperCase();
  const stateB = b.state.toUpperCase();
  let comparison = 0;
  stateA > stateB ? (comparison = 1) : (comparison = -1);
  return comparison;
}
// function sortByCity(a, b) {
//   const cityA = a.name.toUpperCase();
//   const cityB = b.name.toUpperCase();
//   let comparison = 0;
//   cityA > cityB ? (comparison = 1) : (comparison = -1);
//   return comparison;
// }
