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
  const [createNewUser, { data }] = useMutation(NEW_CONTRIBUTOR_CREATE);
  const [signType, setSignType] = useState("Create");
  const [userInfo, setUserInfo] = useState({});
  const [userQueryReturn, setUserQueryReturn] = useState({});
  const [hashPass, setHashPass] = useState("");
  const [hashTimer, setHashTimer] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setUserQueryReturn(data);
    props.setUserInfo(data);
  }, [userInfo]);

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ::::::::::: Creating a Contributor ::::::::::::::::::::::::::::::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const createContributor = () => {
    setHashTimer(true);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        //setHashPass(hash);
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

  // // Adds 0.5s before adding hashed password to db - Hook for setInterval
  // useInterval(() => {
  //   if (hashTimer && count >= 0.5) {
  //     setHashTimer(false);
  //     addNewUser();
  //   } else if (hashTimer && count < 0.5) {
  //     setCount(count + 1);
  //   }
  // }, 1000);

  // // This is called after the timer runs for 0.5s
  // const addNewUser = async () => {
  //   setUserInfo({ email: email, password: hashPass });
  //   setUserName("");
  //   setPassword("");
  // };

  // // Call to mutate DB
  // const mutateCreateContributor = () => {
  //   createNewUser({
  //     variables: {
  //       data: {
  //         name: userName,
  //         password: password,
  //         email: email,
  //         online: true,
  //         status: "PUBLISHED"
  //       }
  //     }
  //   });
  // };
  console.log(data);
  const signInContributor = () => {};
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // Query Call to check sign in Credentials ::::::::::::::::::::::
  const { loading, error, info } = useQuery(SIGN_IN_CONTRIBUTOR, {
    variables: { email: userInfo.email, password: userInfo.password }
  });

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
