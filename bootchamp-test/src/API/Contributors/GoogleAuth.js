import { URL } from "../../constants/url";

//const uuidv1 = require("uuid/v1");
var bcrypt = require("bcryptjs");
const axios = require("axios");

export const GOOGLE_AUTH = res => {
  axios
    .get(URL + "contributors/login", {
      params: {
        email: res.profileObj.email
      }
    })
    .then(function(query) {
      if (query.data !== "") {
        bcrypt.compare(res.tokenId, query.data.password, function(err, res) {
          if (res) {
            console.log("Matched");
            return { auth: true, user: query };
          } else {
            console.log("No Match - or Bug!");
            return { auth: false, user: null };
          }
        });
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(res.tokenId, salt, function(err, hash) {
            console.log("hashing bb");
            axios
              .post(URL + "contributors/", {
                name: res.profileObj.name,
                password: hash,
                email: res.profileObj.email,
                online: true,
                id: res.googleId
              })
              .then(function(res) {
                console.log(res);
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        });
        console.log(res);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
