import React from "react";
import "./Profile.css";

const Profile = props => {
  if (props.auth) {
    return <div>Profile</div>;
  }
  if (!props.auth) {
    return <div>Login</div>;
  }
};
export default Profile;
