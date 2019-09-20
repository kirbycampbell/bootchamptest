import React, {useState, useEffect} from 'react';
import './Contributor.css';
import TopicStateless from '../Topics/TopicStateless';
import {
  getContributor,
  getContributorTopics,
} from '../../apiFuncs/contrib_apis'; // move backend calls here - seperate by type

const Contributor = props => {
  const [contributor, setContributor] = useState([]);
  const [contTopics, setContTopics] = useState([]);
  const slug = props.match.params.id;

  useEffect(() => {
    getContributor(slug).then(res => setContributor(res.data));
    getContributorTopics(slug).then(res => setContTopics(res.data));
  }, [slug]);

  return (
    <div>
      <h1>{contributor.name}</h1>
      {contTopics.map(topic => {
        return <TopicStateless topic={topic} key={topic.id} />;
      })}
    </div>
  );
};

export default Contributor;
