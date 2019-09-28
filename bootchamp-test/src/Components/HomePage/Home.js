import React, { useState, useEffect } from "react";
import "./Home.css";
import { getAllTopics } from "../../API/topic_api";
import TopicStateless from "../../Functional_Components/TopicCard/TopicStateless";
import Footer from "../../Functional_Components/Footer/Footer";

const Home = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(res => setTopics(res));
  }, []);
  return (
    <div className="tile is-ancestor columns">
      {/* ::::::::::::::: LEFT MIDDLE SECTION ::::::::::::::: */}
      <div className="tile column is-parent is-fixed-top  border-right bg_mid">
        <article className="tile is-child  is-info  ">
          <div className="container sidebar ">
            <p className="heading ">Sort By</p>
            <p className="title ">
              <i className="fas fa-fire"></i>
            </p>
            <p className="title ">
              <i className="fas fa-glass-cheers"></i>
            </p>
            <p className="title ">
              <i className="fas fa-sort-numeric-down"></i>
            </p>
            <p className="title ">
              <i className="fas fa-thumbs-up"></i>
            </p>
          </div>
        </article>
      </div>

      {/* :::::::::::: RIGHT MIDDLE SECTION :::::::::::: */}
      <div className="tile is-vertical is-8 column is-three-quarters">
        <div className="tile is-parent">
          <div className="tile is-child  is-danger">
            <div className="content">
              {topics.map(topic => (
                <TopicStateless topic={topic} key={topic.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tile column is-parent is-fixed-top is-one-quarter border-left back_gr_lighter">
        <article className="tile is-child  is-info  ">
          <div className="container sidebar ">
            <p className="title ">Filter</p>
            <div className="tags">
              <span className="tag is-light">Topic</span>
              <span className="tag is-light">City</span>
              <span className="tag is-light">Resource</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;
