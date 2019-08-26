import React from "react";
import "./TopNav.css";

const TopNav = () => {
  return (
    <div className="Outer-TopNav">
      <div className="Inner-TopNav">
        <div className="Nav-Grps-Outer">
          <div className="Nav-Grps">BootChamp</div>
          <div className="Nav-Grps">Topics</div>
          <div className="Nav-Grps">Cities</div>
          <div className="Nav-Grps">Resources</div>
          <div className="Nav-Grps">Profile</div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
