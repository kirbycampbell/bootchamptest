import React from 'react';
import './LeftSortBar.css';

const LeftSortBar = () => {
  return (
    <div className="Outer-LeftBar">
      <div className=" ">
        <h2>Sort By</h2>
        <div className="sort-icon ">
          <i className="fas fa-fire"></i>
        </div>
        <div className="sort-icon ">
          <i className="fas fa-glass-cheers"></i>
        </div>
        <div className="sort-icon ">
          <i className="fas fa-sort-numeric-down"></i>
        </div>
        <div className="sort-icon ">
          <i className="fas fa-thumbs-up"></i>
        </div>
      </div>
    </div>
  );
};

export default LeftSortBar;
