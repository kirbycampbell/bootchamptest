import React, { useState, useEffect } from "react";
import "./Tags.css";
import { URL } from "./../../constants/url";
const axios = require("axios");
const uuidv1 = require("uuid/v1");

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [typeTag, setTypeTag] = useState("");
  const [queryMatch, setQueryMatch] = useState([]);
  const [queryList, setQueryList] = useState([]);

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

  const createTag = () => {
    let found = false;
    let newList = queryList;
    tags.filter(tag => {
      if (tag.label === typeTag.toLowerCase()) {
        found = true;
        newList.push(tag);
        setQueryList(newList);
        setTypeTag("");
        setQueryMatch([]);
      }
      return null;
    });
    if (!found) {
      axios
        .post(URL + "tags/", {
          id: uuidv1(),
          label: typeTag.toLowerCase()
        })
        .then(function(res) {
          axios
            .get(URL + "tags/")
            .then(function(response) {
              setTags(response.data);
              newList.push(res.data);
              setQueryList(newList);
              setTypeTag("");
              setQueryMatch([]);
              console.log(res);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
    }
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      createTag();
    } else if (event.key === ",") {
      createTag();
    }
  };

  return (
    <div>
      <div>
        <div className="input-card">
          {/* ::::::::::: Chosen Tags :::::::::::::: */}
          {queryList.length > 0 &&
            queryList.map(item => {
              return (
                <span key={item.id} className="chosen-tag">
                  {item.label.charAt(0).toUpperCase() + item.label.slice(1)}

                  <div className="x-out" onClick={() => removeTag(item)}>
                    X
                  </div>
                </span>
              );
            })}
          {/* ::::::::::: Input Section :::::::::::::: */}
          <input
            className="input-form"
            id="tagInput"
            type="text"
            name="tag"
            placeholder="Type Tag"
            onChange={handleTyping}
            onKeyPress={handleKeyPress}
            value={typeTag}
          />
          {/* ::::::::::: Create Button :::::::::::::: */}
          {typeTag.length > 2 && (
            <i onClick={createTag} className="fas fa-check create"></i>
          )}
        </div>
        {/* ::::::::::: List of Search Matches :::::::::::::: */}
        {queryMatch.length > 0 && (
          <div className="Tag-search-results">
            {queryMatch.map(qTag => {
              return (
                <div
                  className="ind-result"
                  key={qTag.id}
                  onClick={() => handleSelect(qTag)}
                >
                  {qTag.label.charAt(0).toUpperCase() + qTag.label.slice(1)}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* ::::::::::: List of All Tags - REMOVE :::::::::::::: */}
      <div>
        <h3>List of All Tags::::</h3>
        {tags.map(tag => {
          return (
            <div key={tag.id} className="tag-card">
              {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
