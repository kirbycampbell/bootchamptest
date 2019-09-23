import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { URL } from "./../../constants/url";
import TopicStateless from "../Topics/TopicStateless";
import {
  getContributor,
  getContributorTopics,
  getContributorResources,
  patchContributorCities
} from "../../API_Front/contrib_apis"; // move backend calls here - seperate by type
import ResourceStateless from "../Resources/ResourceStateless";
import Cities from "../Cities/Cities";

const axios = require("axios");

const Profile = props => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [contributor, setContributor] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [resourceList, setResourceList] = useState([]);
  const [city, setCity] = useState(null);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const logUserOut = useCallback(
    user => {
      dispatch({ type: "LOGOUT_USER" });
      setLoggedOut(true);
    },
    [dispatch]
  );
  console.log(loaded);

  useEffect(() => {
    getContributor(user.id).then(res => setContributor(res.data));
    getContributorTopics(user.id).then(res => setTopics(res.data));
    getContributorResources(user.id).then(res => setResourceList(res.data));
  }, [loaded]);

  // need to make endpoint that matches all topics in array
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

  const addAvatar = () => {
    setLoaded(false);
    axios
      .patch(URL + "contributors/avatar/" + user.id, {
        avatar: avatar
      })
      .then(function(res) {
        console.log(res);
        setLoaded(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const addCityToContributor = () => {
    patchContributorCities(user.id, city).then(res => console.log(res.data));
  };

  if (!props.auth && loggedOut) {
    return <Redirect to="/LogIn" />;
  } else if (!props.auth && !localStorage.getItem("User")) {
    return <div>Please Login Properly!</div>;
  } else {
    return (
      <div className="Outer-Profile">
        <div className="Inner-Profile">
          <div className="Profile-Title"> {contributor.name}'s Profile</div>

          {/* ::::::::::: AVATAR AREA :::::::::: */}
          {contributor.avatar ? (
            <div className="pic-cont">
              <img className="pic" src={contributor.avatar} alt="ProfilePic" />
            </div>
          ) : (
            <div className="add-pic-cont">
              Add Profile Picture <br />
              <div className="upload-btn-wrapper">
                {/* <button className="btn">Upload a file</button>
                <input type="file" name="myfile" /> */}
                <input
                  className="input-resource"
                  type="text"
                  placeholder="Image Link"
                  onChange={e => setAvatar(e.target.value)}
                  autoComplete="off"
                />
                <input
                  className="submit-btn"
                  placeholder="Post Topic"
                  onClick={() => addAvatar()}
                  type="submit"
                />
              </div>
            </div>
          )}
          {/*  :::::::::: City Area :::::::::: */}
          {!contributor.cities ? (
            <React.Fragment>
              <Cities setCity={setCity} city={city} />
              <div className="input-citysbm" onClick={addCityToContributor}>
                Add City
              </div>
            </React.Fragment>
          ) : (
            <div className="profile-city">
              Location: {contributor.cities.name}, {contributor.cities.state}
            </div>
          )}
          <Link to={"/Contributor/" + user.id} className="custom-link">
            {" "}
            <h4>View your Profile how Other's see it!</h4>
          </Link>
          {/* :::::::::: Resource AREA ::::::::::: */}
          <div className="Topic-List">
            <h2>Resources</h2>
            {resourceList.map(resource => {
              return <ResourceStateless topic={resource} key={resource.id} />;
            })}
          </div>

          {/* :::::::::: TOPIC AREA ::::::::::: */}
          <div className="Topic-List">
            <h2>Topics</h2>
            {topics.map(topic => {
              return <TopicStateless topic={topic} key={topic.id} />;
            })}
          </div>
          {/* :::::::::: LOGOUT AREA ::::::::::: */}
          <div className="logout-btn">
            <button
              onClick={() => {
                logUserOut();
              }}
            >
              LogOut of Account
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Profile;
