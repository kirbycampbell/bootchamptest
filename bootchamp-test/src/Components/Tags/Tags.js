import React, {useState, useEffect} from 'react';
import './Tags.css';
import {URL} from './../../constants/url';
const axios = require('axios');
const uuidv1 = require('uuid/v1');

// When calling this component, switch chosen tags to props
// method so that the array of objs can be sent.

const Tags = ({tags, setTags}) => {
  const [typeTag, setTypeTag] = useState('');
  const [queryMatch, setQueryMatch] = useState([]);
  //const [tags, settags] = useState([]);

  useEffect(() => {
    if (typeTag.length > 2) {
      axios.get(URL + 'tags/matches/' + typeTag).then(function(response) {
        setQueryMatch(response.data);
      });
    }
  }, [typeTag]);

  const handleForm = tag => {
    let newList = tags.filter(item => {
      return item.id !== tag.id;
    });
    newList.push(tag);
    setTags(newList);
    setTypeTag('');
    setQueryMatch([]);
  };

  const handleTyping = e => {
    setTypeTag(e.target.value);
  };

  const handleSelect = tag => {
    handleForm(tag);
  };

  const removeTag = tag => {
    let newList = tags.filter(item => {
      return item.id !== tag.id;
    });
    setTags(newList);
  };

  const createTag = () => {
    let found = false;
    axios.get(URL + 'tags/').then(function(response) {
      response.data.filter(tag => {
        if (tag.label === typeTag.toLowerCase()) {
          found = true;
          handleForm(tag);
        }
        return null;
      });
      if (!found) {
        axios
          .post(URL + 'tags/', {
            id: uuidv1(),
            label: typeTag.toLowerCase(),
          })
          .then(function(res) {
            axios
              .get(URL + 'tags/')
              .then(function(response) {
                handleForm(res.data);
              })
              .catch(function(error) {
                console.log(error);
              });
          });
      }
    });
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      createTag();
    } else if (event.key === ',') {
      createTag();
    }
  };

  return (
    <div className="Outer-TagComp">
      <div className="input-card">
        {/* ::::::::::: Chosen Tags :::::::::::::: */}
        {tags.length > 0 &&
          tags.map(tag => {
            return (
              <span key={tag.id} className="chosen-tag">
                {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}

                <div className="x-out" onClick={() => removeTag(tag)}>
                  <i className="far fa-times-circle iconb" />
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
          placeholder="Enter Tags..."
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          value={typeTag}
          autoComplete="off"
        />
        {/* ::::::::::: Create Button :::::::::::::: */}
        {typeTag.length > 2 && (
          <i onClick={createTag} className="fas fa-check create"></i>
        )}
      </div>
      {/* ::::::::::: List of Search Matches :::::::::::::: */}
      <div className="Tag-Results">
        {queryMatch.length > 0 && typeTag.length > 2 && (
          <div className="Tag-search-results">
            {queryMatch.map(tag => {
              return (
                <div
                  className="ind-result"
                  key={tag.id}
                  onClick={() => handleSelect(tag)}
                >
                  {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;
