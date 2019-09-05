import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { Redirect } from "react-router";
import { axios } from "axios";
import { URL } from "./../../constants/url";

const Profile = props => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [topics, setTopics] = useState(null);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const logUserOut = useCallback(
    user => {
      dispatch({ type: "LOGOUT_USER" });
      setLoggedOut(true);
    },
    [dispatch]
  );
  console.log(user);

  // need tp make endpoint that matches all topics in array
  // useEffect(() => {
  //   axios.get(URL + "topics")
  // }, []);

  if (!props.auth && loggedOut) {
    return <Redirect to="/LogIn" />;
  } else if (!props.auth && !localStorage.getItem("User")) {
    return <div>Please Login Properly!</div>;
  } else {
    return (
      <div className="Outer-Profile">
        <div className="Inner-Profile">
          <div className="Profile-Title"> {user.name}'s Profile</div>

          <div className="pic-cont">
            <img className="pic" src={user.avatar} alt="Profile" />
          </div>
          <div className="Topic-List">Topics</div>
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
