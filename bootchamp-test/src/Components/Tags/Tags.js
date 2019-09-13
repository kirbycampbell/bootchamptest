import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Tags.css";
import { URL } from "./../../constants/url";
const axios = require("axios");

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [typeTag, setTypeTag] = useState("");
  const [queryMatch, setQueryMatch] = useState([]);
  const [queryList, setQueryList] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    axios.get(URL + "tags/").then(function(response) {
      setTags(response.data);
    });
  }, []);

  useEffect(() => {
    if (typeTag.length > 2) {
      axios.get(URL + "tags/matches/" + typeTag).then(function(response) {
        console.log(response.data);
        setQueryMatch(response.data);
      });
    }
  }, [typeTag]);

  const handleTyping = e => {
    setTypeTag(e.target.value);
  };

  const handleSelect = tag => {
    let newList = queryList.filter(item => {
      return item.id !== tag.id;
    });
    newList.push(tag);
    setQueryList(newList);
    setTypeTag("");
    setQueryMatch([]);
  };

  const removeTag = tag => {
    let newList = queryList.filter(item => {
      return item.id !== tag.id;
    });
    setQueryList(newList);
  };

  return (
    <div>
      <div>
        <div className="tag-card">
          {/* ::::::::::: Chosen Tags :::::::::::::: */}
          {queryList.length > 0 &&
            queryList.map(item => {
              return (
                <span key={item.id} className="chosen-tag">
                  {item.label}
                  <div className="x-out" onClick={() => removeTag(item)}>
                    X
                  </div>
                </span>
              );
            })}
          {/* ::::::::::: Input Section :::::::::::::: */}
          <input
            type="text"
            name="tag"
            placeholder="Type Tag Name here"
            onChange={handleTyping}
            value={typeTag}
          />
        </div>
        {/* ::::::::::: List of Search Matches :::::::::::::: */}
        {queryMatch.length > 0 && (
          <div>
            {queryMatch.map(qTag => {
              return (
                <div key={qTag.id} onClick={() => handleSelect(qTag)}>
                  {qTag.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* ::::::::::: List of All Tags :::::::::::::: */}
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
