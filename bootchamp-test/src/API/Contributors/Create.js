import { URL } from "../../constants/url";

const uuidv1 = require("uuid/v1");
var bcrypt = require("bcryptjs");
const axios = require("axios");

export const CREATE_CONTRIBUTOR = params => {
  console.log(params);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(params.password, salt, function(err, hash) {
      console.log("hashing bb");
      axios
        .post(URL + "contributors/", {
          name: params.name,
          password: hash,
          email: params.email,
          online: true,
          id: uuidv1()
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  });
};
