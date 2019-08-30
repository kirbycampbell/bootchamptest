import React from "react";

const AuthButtons = props => {
  return (
    <div className="bottom-btn">
      {props.signType === "Create" && (
        <React.Fragment>
          <div className="signIn-Title">Or Sign In</div>
          <button
            className="btn-create"
            onClick={() => props.setSignType("SignIn")}
          >
            Sign In
          </button>
        </React.Fragment>
      )}
      {props.signType === "SignIn" && (
        <React.Fragment>
          <div className="signIn-Title">Not a Member? Sign Up!</div>
          <button
            className="btn-create"
            onClick={() => props.setSignType("Create")}
          >
            Create Account
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default AuthButtons;
