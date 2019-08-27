import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { NEW_CONTRIBUTOR_CREATE } from "../../API/Mutations";
import { SIGN_IN_CONTRIBUTOR } from "../../API/Queries";
import { GoogleLogin } from "react-google-login";
import useInterval from "./../useInterval";

import "./NewUser.css";
var bcrypt = require("bcryptjs");

const NewUser = props => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNewUser] = useMutation(NEW_CONTRIBUTOR_CREATE);
  const [signType, setSignType] = useState("Create");
  const [userInfo, setUserInfo] = useState({});
  const [userQueryReturn, setUserQueryReturn] = useState({});

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ::::::::::: Creating a Contributor ::::::::::::::::::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const createContributor = () => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        console.log("hashing bb");
        createNewUser({
          variables: {
            data: {
              name: userName,
              password: hash,
              email: email,
              online: true,
              status: "PUBLISHED"
            }
          }
        });
      });
    });
  };

  // TODO TOMORROW: Seperate newUser and signIn into seperate components, switched
  //between with the same toggle button. This will make the sign in query clearer.
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ::::::::::: Signing in a Contributor ::::::::::::::::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  const signInContributor = () => {
    setUserInfo({ email: email });
  };

  // Query Call to check sign in Credentials ::::::::::::::::::::::
  const { loading, error, data } = useQuery(SIGN_IN_CONTRIBUTOR, {
    variables: { email: userInfo.email }
  });

  // useEffect(() => { TODO FIX THISSSSSSSS
  //   console.log("new data");
  //   console.log(data);
  //   let hashedPass = data.constributors[0].password;
  //   bcrypt.compare(password, hashedPass, function(err, res) {
  //     // res === true
  //     if (res) {
  //       console.log("Matched");
  //     } else {
  //       console.log("No Match - or Bug!");
  //     }
  //   });
  // }, [data]);

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // :::::::::::::::::: Google oAuth Reponse Methods :::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const responseGoogle = response => {
    console.log(response);
  };
  const successSignIn = response => {
    console.log(response);
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

// client id = 449733747094-9q8j6e8a2tm95p6tvk3m3tjjtjaaejk3.apps.googleusercontent.com
//client secret = MnAska5__leRTVBSsli194dx

// name: WE.profileObj.name
// avatar: WE.profileObj.imageUrl
// email: WE.profileObj.email
// password:
