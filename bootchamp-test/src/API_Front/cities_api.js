import { URL } from "../constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

export async function getAllCities(props, hash) {
  return await axios.get(URL + "cities/").then(res => res);
}
