import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import "./AuthUser.css";
import { useDispatch } from "react-redux";
import {
  createGoogleContributorMutate,
  GoogleSigninQuery
} from "../../API_Front/login_api";
var bcrypt = require("bcryptjs");

const GoogleComp = props => {
  const dispatch = useDispatch();
  const loginUser = useCallback(
    user => dispatch({ type: "LOGIN_USER", payload: user }),
    [dispatch]
  );

  const successSignIn = res => {
    props.setLoading(true);
    GoogleSigninQuery(res)
      .then(function(query) {
        if (query.data !== "") {
          bcrypt.compare(res.tokenId, query.data.password, function(err, res) {
            if (res) {
              props.setMessage("Success!");
              props.setLoading(false);
              console.log("GoogleComp.js login");
              console.log(query.data);
              const timer = setTimeout(() => loginUser(query.data), 2000);
              return () => clearTimeout(timer);
            } else {
              props.setLoading(false);
              console.log(query);
              props.setError("Incorrect Google Credentials...");
              return { auth: false, user: null };
            }
          });
        } else {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(res.tokenId, salt, function(err, hash) {
              console.log("hashing bb");

              createGoogleContributorMutate(res, hash)
                .then(function(res) {
                  console.log(res);
                  props.setMessage("Successfully Created!");
                  props.setLoading(false);
                  const timer = setTimeout(() => loginUser(res.data), 2000);
                  return () => clearTimeout(timer);
                })
                .catch(function(error) {
                  props.setLoading(false);
                  props.setError(error);
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
  return (
    <div className="Google-SignIn">
      <GoogleLogin
        clientId="449733747094-9q8j6e8a2tm95p6tvk3m3tjjtjaaejk3.apps.googleusercontent.com"
        buttonText="Login with Google"
        theme="dark"
        icon="true"
        onSuccess={successSignIn}
        //onFailure={errorResponse}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleComp;
