import React, { useCallback } from "react";
import { URL } from "../../constants/url";
import { useDispatch } from "react-redux";

const uuidv1 = require("uuid/v1");
var bcrypt = require("bcryptjs");
const axios = require("axios");

const CreateUser = props => {
  const dispatch = useDispatch();
  const loginUser = useCallback(
    user => dispatch({ type: "LOGIN_USER", payload: user }),
    [dispatch]
  );
  const createContributor = () => {
    if (
      props.userName.length > 6 &&
      props.password.length > 6 &&
      props.email.length > 6
    ) {
      props.setLoading(true);
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(props.password, salt, function(err, hash) {
          axios
            .post(URL + "contributors/", {
              name: props.userName,
              password: hash,
              email: props.email,
              online: true,
              id: uuidv1()
            })
            .then(function(response) {
              props.setMessage("Successfully Created!");
              props.setLoading(false);
              const timer = setTimeout(() => loginUser(response.data), 2000);
              return () => clearTimeout(timer);
            })
            .catch(function(error) {
              props.setLoading(false);
              props.setError(error);
            });
        });
      });
    } else if (props.userName.length <= 6) {
      props.setLoading(false);
      props.setError("User Name Must be at least 7 characters long!");
    } else if (props.password.length <= 6) {
      props.setLoading(false);
      props.setError("Password Must be at least 7 characters long!");
    } else if (props.email.length <= 6) {
      props.setLoading(false);
      props.setError("Please type in a proper email!");
    }
  };

  return (
    <button
      className="btn-create"
      type="button"
      onClick={() => createContributor()}
    >
      Create Account
    </button>
  );
};

export default CreateUser;
