import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Tags.css";
import { URL } from "./../../constants/url";
const axios = require("axios");

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [typeTag, setTypeTag] = useState("");
  const user = useSelector(state => state.user);

  useEffect(() => {
    axios.get(URL + "tags/").then(function(response) {
      console.log(response);
      setTags(response.data);
    });
  }, []);

  const handleTyping = e => {
    setTypeTag(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          className="tag-card"
          type="text"
          name="tag"
          placeholder="Type Tag Name here"
          onChange={handleTyping}
          value={typeTag}
        />
      </div>
      <div>
        {tags.map(tag => {
          return (
            <div key={tag.id} className="tag-card">
              {tag.label}-{tag.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
