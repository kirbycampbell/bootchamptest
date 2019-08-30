import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import "./Profile.css";
import { Redirect } from "react-router";

const Profile = props => {
  const [loggedOut, setLoggedOut] = useState(false);
  const dispatch = useDispatch();
  const logUserOut = useCallback(
    user => {
      dispatch({ type: "LOGOUT_USER" });
      setLoggedOut(true);
    },
    [dispatch]
  );

  if (!props.auth && loggedOut) {
    return <Redirect to="/LogIn" />;
  } else if (!props.auth && !localStorage.getItem("User")) {
    return <div>Please Login Properly!</div>;
  } else {
    return (
      <div>
        Profile
        <div>
          <button
            onClick={() => {
              logUserOut();
            }}
          >
            LogOut of Account
          </button>
        </div>
      </div>
    );
  }
};
export default Profile;
