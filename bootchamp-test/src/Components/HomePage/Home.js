import React, {useState, useEffect} from 'react';
import './Home.css';
import {getAllTopics} from '../../API/topic_api';
import TopicStateless from '../../Functional_Components/TopicCard/TopicStateless';
import LeftSortBar from '../../Functional_Components/LeftSortBar/LeftSortBar';

const Home = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(res => setTopics(res));
  }, []);
  return (
    <div className="">
      {/* :::::::::::: RIGHT MIDDLE SECTION :::::::::::: */}
      <div className="">
        <div className="">
          <div className=" ">
            <div className="">
              {topics.map(topic => (
                <TopicStateless topic={topic} key={topic.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
