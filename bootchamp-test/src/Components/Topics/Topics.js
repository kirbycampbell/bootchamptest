import React, {useState, useEffect} from 'react';
import './Topics.css';
import {URL} from '../../constants/url';
import CreateTopic from './CreateTopic';
var moment = require('moment');

const axios = require('axios');

const Topics = props => {
  const [topics, setTopics] = useState([]);
  console.log(props);
  useEffect(() => {
    axios
      .get(URL + 'topics/')
      .then(function(response) {
        setTopics(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  console.log(topics);
  return (
    <React.Fragment>
      <CreateTopic />
      <div className="topics">
        {topics.map(topic => (
          <div className="Topic-Container" key={topic.id}>
            <div className="TopTitle">
              {topic.name}
              <div className="TopCreatedBy">{topic.createdBy.name}</div>
              <div className="TopCreatedAt">
                {moment(topic.createdAt).format('MM/DD/YYYY')}
              </div>
            </div>
            <div className="TopContent">
              {topic.content}
              <div className="TopImg">
                <img src={topic.images} alt={topic.images} />
              </div>
            </div>
            <div className="TopTags">
              {topic.tags.map(tag => {
                return (
                  <div className="IndTag" key={tag.id}>
                    {tag.label}
                  </div>
                );
              })}
            </div>
            <div className="TopFooter">
              <div className="TopLikes">Likes: {topic.likedBy.length}</div>
              <div className="TopCity">
                {topic.cities.name} - {topic.cities.state}
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Topics;
