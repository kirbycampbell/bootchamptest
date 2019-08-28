import React from "react";
import "./TopNav.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const TopNav = () => {
  console.log(Router, Route);
  return (
    <div className="Outer-TopNav">
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
          <Link to="/Profile" className="custom-link Nav-Grps">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
