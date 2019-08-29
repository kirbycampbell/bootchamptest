import React from "react";
import { GoogleLogin } from "react-google-login";
import "./NewUser.css";

const GoogleComp = props => {
  return (
    <div>
      <div>
        <GoogleLogin
          clientId="449733747094-9q8j6e8a2tm95p6tvk3m3tjjtjaaejk3.apps.googleusercontent.com"
          buttonText="Login with Google"
          theme="dark"
          icon="true"
          onSuccess={props.successSignIn}
          onFailure={props.errorResponse}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default GoogleComp;
