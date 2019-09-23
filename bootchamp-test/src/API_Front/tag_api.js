import { URL } from "../constants/url";
const axios = require("axios");

export async function getTopicsByTag(id, tags) {
  console.log(id);
  return await axios
    .get(URL + "topics/tags_id/" + id, {
      tagIds: id
    })
    .then(res => res);
}
