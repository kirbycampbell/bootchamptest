import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { Redirect } from "react-router";

import { URL } from "./../../constants/url";
const axios = require("axios");

const Profile = props => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const logUserOut = useCallback(
    user => {
      dispatch({ type: "LOGOUT_USER" });
      setLoggedOut(true);
    },
    [dispatch]
  );

  // need tp make endpoint that matches all topics in array
  useEffect(() => {
    if (user.name !== undefined) {
      axios
        .get(URL + "topics/usertopics/" + user.id)
        .then(function(res) {
          setTopics(res.data);
          setLoaded(true);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }, [user]);

  // TOMORROW:
  // try querying topics for all topics in query array!
  // could be a handy feature to add

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
          <div className="Topic-List">
            <h2>Topics</h2>
            {topics.map(topic => {
              return (
                <div className="Outer-Profile" key={topic.id}>
                  <div className="Topic-Name">{topic.name}</div>
                  <div>{topic.content.text}</div>
                </div>
              );
            })}
          </div>
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
