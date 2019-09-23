import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createContributorMutate } from "../../API_Front/login_api";

var bcrypt = require("bcryptjs");

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
          createContributorMutate(props, hash)
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
