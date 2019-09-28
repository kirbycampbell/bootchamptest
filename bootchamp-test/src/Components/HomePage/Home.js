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
    <section className="hero is-desktop ">
      {/* ::::::::::::::: NAVBAR Section ::::::::::::::: */}
      <div className="hero-head is-fullwidth">
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
            <div id="navbarMenuHeroA" className="navbar-menu nav-font">
              <div className="navbar-start">
                <a className="navbar-item is-active">Home</a>
                <a className="navbar-item">
                  <div>Topics</div>
                </a>{" "}
                <div className="item">
                  <i class="fas fa-plus-square"></i>{" "}
                </div>
                <a className="navbar-item">Resources</a>
              </div>
              <div className="navbar-end">
                <a className="navbar-item">Profile</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* ::::::::::::::::::::::::: OVERALL MIDDLE SECTION ::::::::::::::::::::::::: */}
      <div className="tile is-ancestor columns">
        {/* ::::::::::::::: LEFT MIDDLE SECTION ::::::::::::::: */}
        {/* <div className="tile is-parent column border-right">
          <div className="tile is-child content is-danger">Left</div>
        </div> */}
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
      {/* ::::::::::::::: FOOTER SECTION ::::::::::::::: */}
      <div className="hero-foot border-top">
        <nav className="tabs">
          <div className="container">
            <ul>
              <li className="is-active">
                <a>About BootChamp</a>
              </li>
              <li>
                <a>Creators</a>
              </li>
              <li>
                <a>Documentation</a>
              </li>
              <li>
                <a>Endpoints</a>
              </li>
              <li>
                <a>Jobs</a>
              </li>
              <li>
                <span className="navbar-item">
                  <a className="button is-primary ">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Source Code</span>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Home;
