import { URL } from "../constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

export async function createContributorMutate(props, hash) {
  return await axios
    .post(URL + "contributors/", {
      name: props.userName,
      password: hash,
      email: props.email,
      online: true,
      id: uuidv1()
    })
    .then(res => res);
}

export async function SigninQuery(props) {
  return await axios
    .get(URL + "contributors/login", {
      params: {
        email: props.email
      }
    })
    .then(res => res);
}

export async function createGoogleContributorMutate(resp, hash) {
  return await axios
    .post(URL + "contributors/", {
      name: resp.profileObj.name,
      password: hash,
      email: resp.profileObj.email,
      online: true,
      id: resp.googleId
    })
    .then(res => res);
}
export async function GoogleSigninQuery(resp) {
  return await axios
    .get(URL + "contributors/login", {
      params: {
        email: resp.profileObj.email
      }
    })
    .then(res => res);
}
