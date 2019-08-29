import React, { useState } from "react";
import "./NewUser.css";
import { SIGN_IN } from "../../API/Contributors/SignIn";
import { CREATE_CONTRIBUTOR } from "./../../API/Contributors/Create";
import { GOOGLE_AUTH } from "../../API/Contributors/GoogleAuth";
import GoogleComp from "./GoogleComp";

function NewUser() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signType, setSignType] = useState("Create");
  const [error, setError] = useState(null);

  const successSignIn = res => {
    GOOGLE_AUTH(res);
  };
  const errorResponse = res => {
    if (res) {
      setError(res);
    }
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
            onClick={() =>
              CREATE_CONTRIBUTOR({
                name: userName,
                password: password,
                email: email
              })
            }
          >
            Create Account
          </button>
        )}
        {signType === "SignIn" && (
          <button
            className="btn-create"
            type="button"
            onClick={() => SIGN_IN(email, password)}
          >
            Sign In
          </button>
        )}

        <div className="Google-SignIn">
          <GoogleComp successSignIn={successSignIn} onFailure={errorResponse} />
        </div>
        {error && <div>{error}</div>}
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
}

export default NewUser;
