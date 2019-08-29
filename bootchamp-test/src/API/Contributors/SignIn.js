import { URL } from "../../constants/url";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/index";

var bcrypt = require("bcryptjs");
const axios = require("axios");

export const SIGN_IN = (email, password) => {
  axios
    .get(URL + "contributors/login", {
      params: {
        email: email
      }
    })
    .then(function(response) {
      console.log(response);
      bcrypt.compare(password, response.data.password, function(err, res) {
        if (res) {
          console.log("Matched");
          console.log(response.data);
          loginUser(response.data);
        } else {
          console.log("No Match - or Bug!");
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};
