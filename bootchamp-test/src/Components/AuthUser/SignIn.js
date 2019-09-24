import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SigninQuery } from "../../API/login_api";
import { loginUserAction } from "../../Redux/actions";

var bcrypt = require("bcryptjs");

const SignIn = props => {
  const dispatch = useDispatch();
  const loginUser = useCallback(user => dispatch(loginUserAction(user)), [
    dispatch
  ]);

  const signInUser = () => {
    props.setLoading(true);
    SigninQuery(props)
      .then(function(response) {
        console.log(response);
        bcrypt.compare(props.password, response.data.password, function(
          err,
          res
        ) {
          if (res) {
            props.setMessage("Success!");
            props.setLoading(false);
            const timer = setTimeout(() => loginUser(response.data), 2000);
            return () => clearTimeout(timer);
          } else {
            props.setLoading(false);
            props.setError("Incorrect Username and/or Password...");
          }
        });
      })
      .catch(function(error) {
        props.setLoading(false);
        props.setError(error);
      });
  };

  return (
    <button className="btn-create" type="button" onClick={() => signInUser()}>
      Sign In
    </button>
  );
};

export default SignIn;
