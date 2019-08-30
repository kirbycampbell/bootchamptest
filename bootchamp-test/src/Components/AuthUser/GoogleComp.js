import React from "react";
import { GOOGLE_AUTH } from "../../API/Contributors/GoogleAuth";
import { GoogleLogin } from "react-google-login";
import "./AuthUser.css";

const GoogleComp = props => {
  const successSignIn = res => {
    GOOGLE_AUTH(res);
  };
  // const errorResponse = res => {
  //   if (res) {
  //     props.setError(res);
  //   }
  // };

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
