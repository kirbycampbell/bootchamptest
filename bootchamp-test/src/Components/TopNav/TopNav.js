import React from "react";
import "./TopNav.css";
import { Link } from "react-router-dom";
import logo from "./BootchampLogo.png";

const TopNav = props => {
  const LinkBtns = () => {
    return (
      <div className="Inner-TopNav">
        <div className="Nav-Grps-Outer">
          <Link to="/" className="custom-link Nav-Grps">
            BootChamp
          </Link>
          <Link to="/Topics" className="custom-link Nav-Grps">
            Topics
          </Link>
          <Link to="/Cities" className="custom-link Nav-Grps">
            Cities
          </Link>{" "}
          <Link to="/Resources" className="custom-link Nav-Grps">
            Resources
          </Link>{" "}
          <Link
            to={props.auth ? "/Profile" : "/Login"}
            className="custom-link Nav-Grps"
          >
            {props.auth && "Profile"}
            {!props.auth && "Login"}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="Outer-TopNav">
      <LinkBtns />

      <div className="Mobile-Nav">
        <div className="Btn-Outer">
          <i className="fas fa-bars icon-bars" />
        </div>
        <img className="BC-logo" src={logo} alt="Bootchamp Logo" />
        <div className="Btn-Outer">
          <i className="fas fa-plus icon-bars" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
