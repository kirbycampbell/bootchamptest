import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './Home.css';
import {getAllTopics} from '../../API/topic_api';
import TopicStateless from '../../Functional_Components/TopicCard/TopicStateless';
import LeftSortBar from '../../Functional_Components/LeftSortBar/LeftSortBar';
import RightFilterBox from '../../Functional_Components/RightFilterBox/RightFilterBox';
import TagPage from '../Tags/TagPage';
import Loader from '../../Functional_Components/Loader/Loader';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllTopics().then(res => {
      setTopics(res);
      setLoading(false);
    });
  }, []);
  const AllTopics = () => {
    return topics.map(topic => <TopicStateless topic={topic} key={topic.id} />);
  };
  return (
    <Router>
      <LeftSortBar />
      <RightFilterBox />
      <Route exact path="/TagPage" render={() => <TagPage />} />
      <Route exact path="/" render={() => <AllTopics />} />
    </Router>
  );
};

export default Home;
