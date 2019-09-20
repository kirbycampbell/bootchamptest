import {URL} from './../constants/url';

const axios = require('axios');

export async function getContributor(id) {
  return await axios.get(URL + 'contributors/user/' + id).then(res => res);
}

export async function getContributorTopics(id) {
  return await axios.get(URL + 'topics//usertopics/' + id).then(res => res);
}
