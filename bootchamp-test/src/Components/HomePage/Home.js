import React, { useState, useEffect } from "react";
import "./Home.css";
import { getAllTopics } from "../../API/topic_api";
import TopicStateless from "../../Functional_Components/TopicCard/TopicStateless";

const Home = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(res => setTopics(res));
  }, []);
  return (
    <section className="hero   is-desktop ">
      {/* ::::::::::::::: NAVBAR Section ::::::::::::::: */}
      <div className="hero-head ">
        <nav className="navbar is-fixed-top has-background-black-ter ">
          <div className="container ">
            <div className="navbar-brand ">
              <a className="navbar-item">
                <img
                  src={process.env.PUBLIC_URL + "BootchampLogo.png"}
                  alt="BCLogo"
                />
              </a>
              <span
                className="navbar-burger burger is-light"
                data-target="navbarMenuHeroA"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item is-active">Home</a>
                <a className="navbar-item">Topics</a>
                <a className="navbar-item">Resources</a>
                <a className="navbar-item">Profile</a>
                <span className="navbar-item">
                  <a className="button is-primary is-inverted">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Source Code</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* ::::::::::::::::::::::::: OVERALL MIDDLE SECTION ::::::::::::::::::::::::: */}
      <div className="tile is-ancestor ">
        {/* ::::::::::::::: LEFT MIDDLE SECTION ::::::::::::::: */}
        <div className="tile is-parent is-fixed-top">
          <article className="tile is-child notification is-info ">
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

        {/* :::::::::::: RIGHT MIDDLE SECTION :::::::::::: */}
        <div className="tile is-vertical is-8">
          <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
              <div className="content">
                {topics.map(topic => (
                  <TopicStateless topic={topic} key={topic.id} />
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
      {/* ::::::::::::::: FOOTER SECTION ::::::::::::::: */}
      <div className="hero-foot">
        <nav className="tabs">
          <div className="container">
            <ul>
              <li className="is-active">
                <a>Overview</a>
              </li>
              <li>
                <a>Modifiers</a>
              </li>
              <li>
                <a>Grid</a>
              </li>
              <li>
                <a>Elements</a>
              </li>
              <li>
                <a>Components</a>
              </li>
              <li>
                <a>Layout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Home;
