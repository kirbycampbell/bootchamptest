import React, { useState, useEffect } from "react";
import "./Topics.scss";
import Tile from "../Tile/tile.component";
import { URL } from "../../constants/url";

const axios = require("axios");

const Topics = ({ id, name, content, tags }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get(URL + "topics/").then(function(response) {
      setTopics(response.data);
    });
  }, []);
  console.log(topics);

  return (
    <div className="topics">
      {topics.map(topic => (
        <div className="Outer-Topic" key={topic.id}>
          <h2>{topic.name}</h2>
          <div>{topic.content.text}}</div>
          <div>Created At: {topic.createdAt}</div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
