import React, { useState } from "react";
import "./TopNav.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicCreateModal from "../Modals/TopicCreateModal";
import ResCreateModal from "../Modals/ResCreateModal";

const TopNav = () => {
  const auth = useSelector(state => state.UserStore.auth);
  const [topicModal, setTopicModal] = useState(false);
  const [resModal, setResModal] = useState(false);
  let modalProps = { topicModal, resModal, setTopicModal, setResModal };

  const NavBar = () => {
    return (
      <div className="hero-head is-fullwidth">
        <nav className="navbar is-fixed-top has-background-black-ter ">
          <div className="container ">
            <div className="navbar-brand ">
              <div className="navbar-item">
                <img
                  src={process.env.PUBLIC_URL + "BootchampLogo.png"}
                  alt="BCLogo"
                />
              </div>
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
                <Link to="/" className="navbar-item is-active">
                  Home
                </Link>
                <TopicCreateModal {...modalProps} />
                <ResCreateModal {...modalProps} />
                <div
                  onClick={() => setTopicModal(!topicModal)}
                  className="navbar-item is-active pointer"
                >
                  Topics <i className="fas fa-plus-square lf-space"></i>
                </div>

                <div
                  onClick={() => setResModal(!resModal)}
                  className="navbar-item is-active pointer"
                >
                  Resources <i className="fas fa-plus-square lf-space"></i>
                </div>
              </div>
              <div className="navbar-end">
                <Link to={auth ? "/Profile" : "/Login"} className="navbar-item">
                  {auth && "Profile"}
                  {!auth && "Login"}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  };
  return <NavBar />;
};

export default TopNav;
