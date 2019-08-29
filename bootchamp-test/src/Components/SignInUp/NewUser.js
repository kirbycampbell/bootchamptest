import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import "./NewUser.css";
import { URL } from "./../../constants/url";

const uuidv1 = require("uuid/v1");
var bcrypt = require("bcryptjs");
const axios = require("axios");

const NewUser = props => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signType, setSignType] = useState("Create");

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ::::::::::: Creating a Contributor ::::::::::::::::::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const createContributor = () => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        console.log("hashing bb");
        axios
          .post(URL + "contributors/", {
            name: userName,
            password: hash,
            email: email,
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

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ::::::::::: Signing in a Contributor ::::::::::::::::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const signInContributor = () => {
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
          } else {
            console.log("No Match - or Bug!");
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // :::::::::::::::::: Google oAuth Reponse Methods :::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const responseGoogle = response => {
    //console.log(response);
  };
  const successSignIn = res => {
    axios
      .get(URL + "contributors/login", {
        params: {
          email: res.profileObj.email
        }
      })
      .then(function(query) {
        if (query.data !== "") {
          console.log("Time to log the user in");
          bcrypt.compare(res.tokenId, query.data.password, function(err, res) {
            if (res) {
              console.log("Matched");
            } else {
              console.log("No Match - or Bug!");
            }
          });
        } else {
          console.log("Time to create NEW USER");
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

  return (
    <div className="Outer-SignUp">
      <div className="Inner-SignUp">
        <div className="signUp-Title">
          {signType === "Create" && <div>Sign Up to Post on BootChamp!</div>}
          {signType === "SignIn" && <div>Welcome Back, Sign In Below!</div>}
        </div>
        {signType === "Create" && (
          <input
            type="text"
            placeholder="UserName"
            className="frm-itm"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="frm-itm"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="frm-itm"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="btn-section">
        {signType === "Create" && (
          <button
            className="btn-create"
            type="button"
            onClick={() => createContributor()}
          >
            Create Account
          </button>
        )}
        {signType === "SignIn" && (
          <button
            className="btn-create"
            type="button"
            onClick={() => signInContributor()}
          >
            Sign In
          </button>
        )}

        <div className="Google-SignIn">
          <div>
            <GoogleLogin
              clientId="449733747094-9q8j6e8a2tm95p6tvk3m3tjjtjaaejk3.apps.googleusercontent.com"
              buttonText="Login with Google"
              theme="dark"
              icon="true"
              onSuccess={successSignIn}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
      <div className="bottom-btn">
        {signType === "Create" && (
          <React.Fragment>
            <div className="signIn-Title">Or Sign In</div>
            <button
              className="btn-create"
              type="button"
              onClick={() => setSignType("SignIn")}
            >
              Sign In
            </button>
          </React.Fragment>
        )}
        {signType === "SignIn" && (
          <React.Fragment>
            <div className="signIn-Title">Not a Member? Sign Up!</div>
            <button
              className="btn-create"
              type="button"
              onClick={() => setSignType("Create")}
            >
              Create Account
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default NewUser;
