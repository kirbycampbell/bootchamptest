import { URL } from "../constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

export async function getResources() {
  return await axios.get(URL + "resources/").then(res => res);
}

export async function createResourceMutate(data) {
  return await axios
    .post(URL + "resources/", {
      id: uuidv1(),
      title: data.title,
      text: data.text,
      link: data.link,
      city: data.city,
      tags: data.tags,
      createdBy: data.createdBy
    })
    .then(res => res);
}
