import { URL } from "../Variable_Constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

export async function getTopicsByTag(id) {
  console.log(id);
  return await axios
    .get(URL + "topics/tags_id/" + id, {
      tagIds: id
    })
    .then(res => res);
}

export async function searchTagsByRegex(query) {
  return await axios.get(URL + "tags/matches/" + query).then(res => res.data);
}

export async function searchAllTags(query) {
  return await axios.get(URL + "tags/").then(res => {
    res.data.filter(tag => {
      if (tag.label === query.toLowerCase()) {
        return tag;
      } else return null;
    });
  });
}

export async function createTagMutate(tag) {
  return await axios
    .post(URL + "tags/", {
      id: uuidv1(),
      label: tag.toLowerCase()
    })
    .then(res => res);
}
