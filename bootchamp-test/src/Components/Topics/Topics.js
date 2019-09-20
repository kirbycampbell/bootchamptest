import React, {useState, useEffect} from 'react';
import './Topics.css';
import {URL} from '../../constants/url';
import CreateTopic from './CreateTopic';
import TopicStateless from './TopicStateless';

const axios = require('axios');

const Topics = () => {
  const [topics, setTopics] = useState([]);
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

      {topics.map(topic => (
        <TopicStateless topic={topic} key={topic.id} />
      ))}
    </React.Fragment>
  );
};

export default Topics;
