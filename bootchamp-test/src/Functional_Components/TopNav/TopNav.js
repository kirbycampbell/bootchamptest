import React from "react";
import "./TopNav.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNav = () => {
  const auth = useSelector(state => state.UserStore.auth);

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

                <Link to="/Topics" className="navbar-item is-active">
                  Topics <i class="fas fa-plus-square lf-space"></i>
                </Link>

                <Link to="/Resources" className="navbar-item is-active">
                  Resources <i class="fas fa-plus-square lf-space"></i>
                </Link>
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
