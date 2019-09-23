import { URL } from "../constants/url";
const axios = require("axios");

export async function getContributor(id) {
  return await axios.get(URL + "contributors/user/" + id).then(res => res);
}

export async function getContributorTopics(id) {
  return await axios.get(URL + "topics/usertopics/" + id).then(res => res);
}
export async function getContributorResources(id) {
  return await axios.get(URL + "resources/contributor/" + id).then(res => res);
}

export async function patchContributorCities(id, params) {
  return await axios
    .patch(URL + "contributors/cities/" + id, {
      city: {
        id: params.id,
        name: params.name,
        state: params.state
      }
    })
    .then(res => res);
}
