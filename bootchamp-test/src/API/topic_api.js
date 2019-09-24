import { URL } from "../Variable_Constants/url";
const axios = require("axios");

export async function getAllTopics() {
  return await axios.get(URL + "topics/").then(res => res.data);
}

export async function getUserTopics(id) {
  return await axios.get(URL + "topics/usertopics/" + id).then(res => res);
}

export async function patchUserAvatar(id, avatar) {
  return await axios
    .patch(URL + "contributors/avatar/" + id, {
      avatar: avatar
    })
    .then(res => res);
}
